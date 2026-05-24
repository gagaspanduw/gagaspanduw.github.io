import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer = ({ playlist, startIndex = 0 }) => {
  const [songIndex, setSongIndex] = useState(startIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && playlist[songIndex]) {
      audioRef.current.src = playlist[songIndex].src;
      const p = audioRef.current.play();
      if (p !== undefined) {
        p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songIndex]);

  const handleNext = () => {
    setSongIndex((prev) => (prev + 1) % playlist.length);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
  };

  const song = playlist[songIndex];
  if (!song) return null;

  return (
    <div style={styles.player}>
      <audio
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={handleNext}
      />
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
  );
};

const styles = {
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
