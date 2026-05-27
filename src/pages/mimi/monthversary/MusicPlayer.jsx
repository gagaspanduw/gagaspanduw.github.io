import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer = ({ playlist, startIndex = 0, loop = false, promptText = 'Tap to play our song' }) => {
  const [songIndex, setSongIndex] = useState(startIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const audioRef = useRef(null);
  const attemptedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onReady = () => {
      if (attemptedRef.current) return;
      attemptedRef.current = true;
      audio.play().then(() => {
        setIsPlaying(true);
        setShowPrompt(false);
      }).catch(() => {
        setIsPlaying(false);
        setShowPrompt(true);
      });
    };

    // If already loaded enough, play immediately
    if (audio.readyState >= 3) {
      onReady();
    } else {
      audio.addEventListener('canplaythrough', onReady, { once: true });
    }

    return () => {
      audio.removeEventListener('canplaythrough', onReady);
    };
  }, []);

  // Retry on any user tap if autoplay was blocked
  useEffect(() => {
    if (!showPrompt) return;
    const retry = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setShowPrompt(false);
        }).catch(() => {});
      }
    };
    // Small delay to avoid the same click that rendered the prompt
    const timer = setTimeout(() => {
      document.addEventListener('click', retry, { once: true });
      document.addEventListener('touchstart', retry, { once: true });
    }, 300);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', retry);
      document.removeEventListener('touchstart', retry);
    };
  }, [showPrompt]);

  const handleNext = () => {
    setSongIndex((prev) => (prev + 1) % playlist.length);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setShowPrompt(false);
      }).catch(() => {});
    }
  };

  const song = playlist[songIndex];
  const shouldLoopSingleTrack = loop && playlist.length === 1;
  if (!song) return null;

  return (
    <>
      <audio ref={audioRef} src={song.src} preload="auto" loop={shouldLoopSingleTrack}
        onPlay={() => { setIsPlaying(true); setShowPrompt(false); }}
        onPause={() => setIsPlaying(false)}
        onEnded={shouldLoopSingleTrack ? undefined : handleNext}
      />

      {showPrompt && (
        <div style={styles.prompt} onClick={togglePlay}>
          <span style={styles.promptNote}>♪</span>
          <span style={styles.promptText}>{promptText}</span>
        </div>
      )}

      <div style={styles.player}>
        <span style={{ ...styles.note, animationPlayState: isPlaying ? 'running' : 'paused' }}>♪</span>
        <div style={styles.info}>
          <span style={styles.title}>{song.title}</span>
          <span style={styles.artist}>{song.artist}</span>
        </div>
        <button style={styles.btn} onClick={togglePlay}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        {playlist.length > 1 && (
          <button style={{ ...styles.btn, fontSize: '11px' }} onClick={handleNext} title="Next song">
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
    bottom: '70px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(183,28,28,0.9)',
    borderRadius: '50px',
    padding: '12px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    zIndex: 998,
    animation: 'promptPulse 2s ease-in-out infinite',
    boxShadow: '0 4px 20px rgba(183,28,28,0.4)',
    WebkitTapHighlightColor: 'transparent',
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
    whiteSpace: 'nowrap',
  },
  player: {
    position: 'fixed',
    bottom: '14px',
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
  },
  title: {
    fontSize: '12px',
    color: '#3d2b1f',
    fontWeight: '600',
    lineHeight: 1.3,
  },
  artist: {
    fontSize: '10px',
    color: '#9a7a5a',
    lineHeight: 1.3,
  },
};

export default MusicPlayer;
