import React, { useState, useRef, useEffect, useCallback } from 'react';

const MusicPlayer = ({ playlist, startIndex = 0, loop = false, promptText = 'Tap to play our song', unlockEventName = null, autoplayOnMount = true, showPromptUi = true }) => {
  const [songIndex, setSongIndex] = useState(startIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const audioRef = useRef(null);
  const shouldAutoplayRef = useRef(true);

  const tryPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return Promise.resolve(false);

    return audio.play().then(() => {
      setIsPlaying(true);
      setShowPrompt(false);
      return true;
    }).catch(() => {
      setIsPlaying(false);
      setShowPrompt(true);
      return false;
    });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!shouldAutoplayRef.current) return;

    let cancelled = false;
    let autoplayResolved = false;

    const attemptAutoplay = () => {
      if (cancelled || autoplayResolved || !shouldAutoplayRef.current) return;
      tryPlay().then((played) => {
        if (played) {
          autoplayResolved = true;
          shouldAutoplayRef.current = false;
        }
      });
    };

    const fallbackTimer = setTimeout(() => {
      if (!cancelled && !autoplayResolved && audio.paused) {
        setShowPrompt(true);
      }
    }, 1800);

    audio.load();

    if (autoplayOnMount) {
      attemptAutoplay();

      audio.addEventListener('loadedmetadata', attemptAutoplay);
      audio.addEventListener('loadeddata', attemptAutoplay);
      audio.addEventListener('canplay', attemptAutoplay);
      audio.addEventListener('canplaythrough', attemptAutoplay);
    }

    return () => {
      cancelled = true;
      clearTimeout(fallbackTimer);
      audio.removeEventListener('loadedmetadata', attemptAutoplay);
      audio.removeEventListener('loadeddata', attemptAutoplay);
      audio.removeEventListener('canplay', attemptAutoplay);
      audio.removeEventListener('canplaythrough', attemptAutoplay);
    };
  }, [autoplayOnMount, songIndex, tryPlay]);

  // Retry on any user interaction if autoplay was blocked
  useEffect(() => {
    if (!showPrompt || !showPromptUi) return;

    const retry = () => {
      tryPlay();
    };

    const timer = setTimeout(() => {
      document.addEventListener('pointerdown', retry, { once: true });
      document.addEventListener('click', retry, { once: true });
      document.addEventListener('touchstart', retry, { once: true });
    }, 250);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('pointerdown', retry);
      document.removeEventListener('click', retry);
      document.removeEventListener('touchstart', retry);
    };
  }, [showPrompt, showPromptUi, tryPlay]);

  useEffect(() => {
    if (!unlockEventName) return undefined;

    const handleUnlock = () => {
      shouldAutoplayRef.current = false;
      tryPlay();
    };

    window.addEventListener(unlockEventName, handleUnlock);
    return () => {
      window.removeEventListener(unlockEventName, handleUnlock);
    };
  }, [tryPlay, unlockEventName]);

  const handleNext = () => {
    shouldAutoplayRef.current = true;
    setSongIndex((prev) => (prev + 1) % playlist.length);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      shouldAutoplayRef.current = false;
      audioRef.current.pause();
    } else {
      shouldAutoplayRef.current = false;
      tryPlay();
    }
  };

  const song = playlist[songIndex];
  const shouldLoopSingleTrack = loop && playlist.length === 1;
  if (!song) return null;

  return (
    <>
      <audio ref={audioRef} src={song.src} preload="auto" loop={shouldLoopSingleTrack} playsInline webkit-playsinline="true"
        onPlay={() => { setIsPlaying(true); setShowPrompt(false); }}
        onPause={() => setIsPlaying(false)}
        onEnded={shouldLoopSingleTrack ? undefined : handleNext}
      />

      {showPrompt && showPromptUi && (
        <button type="button" style={styles.prompt} onClick={togglePlay} aria-label={promptText}>
          <span style={styles.promptNote}>♪</span>
          <span style={styles.promptText}>{promptText}</span>
        </button>
      )}

      <div style={styles.player}>
        <span style={{ ...styles.note, animationPlayState: isPlaying ? 'running' : 'paused' }}>♪</span>
        <div style={styles.info}>
          <span style={styles.title}>{song.title}</span>
          <span style={styles.artist}>{song.artist}</span>
        </div>
        <button type="button" style={styles.btn} onClick={togglePlay} aria-label={isPlaying ? 'Pause music' : 'Play music'}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        {playlist.length > 1 && (
          <button type="button" style={{ ...styles.btn, fontSize: '11px' }} onClick={handleNext} title="Next song" aria-label="Next song">
            ⏭
          </button>
        )}
      </div>

      <style>{`
        @keyframes noteBounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-3px) rotate(-8deg); }
          75% { transform: translateY(-1px) rotate(8deg); }
        }
        @keyframes promptPulse {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.9; }
          50% { transform: translateX(-50%) scale(1.05); opacity: 1; }
        }
      `}</style>
    </>
  );
};

const styles = {
  prompt: {
    position: 'fixed',
    bottom: 'calc(70px + env(safe-area-inset-bottom))',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(183,28,28,0.9)',
    borderRadius: '50px',
    padding: '12px 24px',
    display: 'flex',
     alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    border: 'none',
    zIndex: 998,
    animation: 'promptPulse 2s ease-in-out infinite',
    boxShadow: '0 4px 20px rgba(183,28,28,0.4)',
    WebkitTapHighlightColor: 'transparent',
    maxWidth: 'calc(100vw - 24px)',
    boxSizing: 'border-box',
  },
  promptNote: {
    fontSize: '18px',
    color: '#fff',
  },
  promptText: {
    fontSize: '14px',
    color: '#fff',
    fontFamily: "'Lora', serif",
    fontWeight: 500,
    whiteSpace: 'normal',
    textAlign: 'center',
  },
  player: {
    position: 'fixed',
    bottom: 'calc(14px + env(safe-area-inset-bottom))',
    right: '14px',
    background: 'rgba(255,253,246,0.97)',
    borderRadius: '50px',
    padding: '8px 14px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
    border: '1px solid rgba(180,160,130,0.35)',
    zIndex: 999,
    fontFamily: "'Lora', serif",
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    maxWidth: 'calc(100vw - 28px)',
    boxSizing: 'border-box',
  },
  btn: {
    background: 'transparent',
    border: '1.5px solid rgba(183,28,28,0.5)',
    borderRadius: '50%',
    width: '28px',
    height: '28px',
    cursor: 'pointer',
    color: '#b71c1c',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    padding: 0,
    WebkitTapHighlightColor: 'transparent',
  },
  note: {
    fontSize: '17px',
    color: '#b71c1c',
    animation: 'noteBounce 1.2s ease-in-out infinite',
    display: 'inline-block',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
    minWidth: 0,
  },
  title: {
    fontSize: '12px',
    color: '#3d2b1f',
    fontWeight: '600',
    lineHeight: 1.3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  artist: {
    fontSize: '10px',
    color: '#9a7a5a',
    lineHeight: 1.3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
};

export default MusicPlayer;
