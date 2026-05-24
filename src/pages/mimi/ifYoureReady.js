import React, { useState, useEffect, useRef } from 'react';

const IfYoureReady = () => {
  const [stage, setStage] = useState('envelope');
  const [isPlaying, setIsPlaying] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  const playlist = [
    { title: 'ILYSB', artist: 'LANY', src: 'https://archive.org/download/LANYILYSBlyricVideo/LANY%20-%20ILYSB%20%28lyric%20video%29.mp3' },
    { title: 'River Flows In You', artist: 'Yiruma', src: "https://archive.org/download/yiruma-frame-2017/Yiruma%20-%20Frame%20(2017)/11.%20River%20Flows%20In%20You%20('f%20r%20a%20m%20e'%20Ver.).mp3" },
  ];

  useEffect(() => {
    if (!document.getElementById('mimi-ready-fonts')) {
      const link = document.createElement('link');
      link.id = 'mimi-ready-fonts';
      link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Lora:ital,wght@0,400;0,600;1,400&family=Cormorant+Garamond:wght@500;600;700&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (stage === 'letter' && audioRef.current) {
      audioRef.current.src = playlist[songIndex].src;
      const p = audioRef.current.play();
      if (p !== undefined) {
        p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, songIndex]);

  const handleOpenLetter = () => {
    setStage('opening');
    timerRef.current = window.setTimeout(() => setStage('letter'), 1200);
  };

  const handleBackToEnvelope = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setSongIndex(0);
    setStage('opening');
    window.setTimeout(() => setStage('envelope'), 800);
  };

  const handleNextSong = () => {
    const next = (songIndex + 1) % playlist.length;
    setSongIndex(next);
  };

  const ENV_W = 300;
  const ENV_H = 195;

  return (
    <div style={styles.page}>

      {/* ── ENVELOPE STAGE ── */}
      {(stage === 'envelope' || stage === 'opening') && (
        <div style={styles.envelopeWrapper}>
          <p style={styles.preLabel}>Read only when you feel ready</p>

          <div style={{ width: `${ENV_W}px`, height: `${ENV_H}px`, position: 'relative', filter: 'drop-shadow(0 12px 30px rgba(0,0,0,0.22))' }}>
            {/* Back */}
            <div style={{ position: 'absolute', inset: 0, background: '#e8d5b7', borderRadius: '4px' }} />

            {/* Top flap */}
            <div style={{
              position: 'absolute', top: 0, left: 0, width: 0, height: 0,
              borderLeft: `${ENV_W / 2}px solid transparent`,
              borderRight: `${ENV_W / 2}px solid transparent`,
              borderTop: `${ENV_H * 0.48}px solid #c9a97a`,
              transformOrigin: 'top center', zIndex: 4,
              transition: 'transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: stage === 'opening' ? 'rotateX(-180deg)' : 'rotateX(0deg)',
            }} />

            {/* Side triangles */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: 0, height: 0, borderBottom: `${ENV_H}px solid #dfc9a8`, borderRight: `${ENV_W / 2}px solid transparent`, zIndex: 2 }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 0, height: 0, borderBottom: `${ENV_H}px solid #c8b08a`, borderLeft: `${ENV_W / 2}px solid transparent`, zIndex: 2 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: 0, height: 0, borderBottom: `${ENV_H * 0.55}px solid #e2c99e`, borderLeft: `${ENV_W / 2}px solid transparent`, borderRight: `${ENV_W / 2}px solid transparent`, zIndex: 2 }} />

            {/* Front face */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 3, paddingBottom: '10px' }}>
              {/* Stamp — top right */}
              <div style={{
                position: 'absolute', top: '12px', right: '14px',
                width: '42px', height: '52px',
                border: '2px solid rgba(100,70,30,0.45)',
                borderRadius: '2px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.55)',
                gap: '3px',
              }}>
                <span style={{ fontSize: '18px', lineHeight: 1 }}>♥</span>
                <span style={{ fontFamily: "'Caveat', cursive", fontSize: '8px', color: '#6b3a1f', letterSpacing: '0.5px' }}>SORRY</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px', alignItems: 'flex-start', width: '130px' }}>
                <div style={{ height: '1.5px', width: '65px', background: 'rgba(100,70,30,0.25)', borderRadius: '2px' }} />
                <div style={{ height: '1.5px', width: '130px', background: 'rgba(100,70,30,0.25)', borderRadius: '2px' }} />
              </div>
              <p style={{ fontFamily: "'Caveat', cursive", fontSize: '14px', color: 'rgba(80,50,20,0.55)', marginBottom: '12px', marginTop: 0 }}>
                For: <span style={{ fontSize: '24px', color: '#6b3a1f', fontWeight: 700 }}>Mimi</span>
              </p>
              {/* Wax seal */}
              <div style={{
                width: '46px', height: '46px', background: '#b71c1c', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(183,28,28,0.5)',
                border: '2px solid rgba(255,255,255,0.3)',
                animation: 'pulseSeal 2.5s ease-in-out infinite',
              }}>
                <span style={{ fontSize: '20px', color: 'white', lineHeight: 1 }}>♥</span>
              </div>
            </div>
          </div>

          {stage === 'envelope' && (
            <button className="mimi-open-btn" style={styles.openBtn} onClick={handleOpenLetter}>
              Open the letter  ↑
            </button>
          )}
          {stage === 'opening' && (
            <p style={styles.openingText}>Opening...</p>
          )}
        </div>
      )}

      {/* ── LETTER STAGE ── */}
      {stage === 'letter' && (
        <div style={styles.letterWrapper}>
          <div style={styles.letterPage}>
            {/* Ruled lines */}
            {[...Array(22)].map((_, i) => (
              <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: `${60 + i * 34}px`, height: '1px', background: 'rgba(180,210,240,0.45)', pointerEvents: 'none' }} />
            ))}
            {/* Red margin line */}
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '44px', width: '1.5px', background: 'rgba(255,100,100,0.3)', pointerEvents: 'none' }} />

            <div className="mimi-letter-content" style={styles.letterContent}>
              <div style={{...styles.letterMetaRow, animation: 'readyRise 0.5s ease-out both', animationDelay: '0s'}}>
                <span style={styles.privateTag}>Private note</span>
                <span style={styles.dateText}>May 13, 2026</span>
              </div>

              <p style={{...styles.salutation, animation: 'readyRise 0.5s ease-out both', animationDelay: '0.08s'}}>Dear Langga,</p>

              <p style={{...styles.para, animation: 'readyRise 0.5s ease-out both', animationDelay: '0.18s'}}>
                I keep going back to all the little things we have shared — the late nights talking about nothing and everything, the reels we have shared, the inside jokes that probably only make sense to us. Those things were not small to me.
              </p>

              <p style={{...styles.para, animation: 'readyRise 0.5s ease-out both', animationDelay: '0.28s'}}>
                I remember every game we stayed up for just to have more time together. Every time you laughed at something I said and it felt like the best thing in the world.
              </p>

              <div style={{...styles.highlightBox, animation: 'readyRise 0.5s ease-out both', animationDelay: '0.4s'}}>
                <p style={styles.highlightText}>
                  What we built together — that was real. I do not want to let it go, and I am sorry for the moments I made you feel like I did not see how precious it was.
                </p>
              </div>

              <p style={{...styles.para, animation: 'readyRise 0.5s ease-out both', animationDelay: '0.52s'}}>
                I know I made things harder than they needed to be. I am not writing this to make you feel guilty — I am writing this because you deserve to know that none of it was because I stopped caring. I never stopped.
              </p>

              <p style={{...styles.para, animation: 'readyRise 0.5s ease-out both', animationDelay: '0.62s'}}>
                If your heart still has a small corner for us, I am here.
              </p>

              <div style={{...styles.signatureArea, animation: 'readyRise 0.5s ease-out both', animationDelay: '0.74s'}}>
                <p style={styles.signatureLine}>Always yours,</p>
                <p style={styles.signatureName}>Gagas</p>
                <p style={styles.signatureHint}>(No pressure. Take all the time you need. ♥)</p>
              </div>

              <div style={{ textAlign: 'center', marginTop: '40px', animation: 'readyRise 0.5s ease-out both', animationDelay: '0.86s' }}>
                <button className="mimi-fold-btn" style={styles.foldBackBtn} onClick={handleBackToEnvelope}>
                  ↩ Back to envelope
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MUSIC PLAYER ── */}
      {stage === 'letter' && (
        <div style={styles.musicPlayer}>
          <audio
            ref={audioRef}
            src={playlist[songIndex].src}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={handleNextSong}
          />
          <span style={{ ...styles.musicNote, animationPlayState: isPlaying ? 'running' : 'paused' }}>♪</span>
          <div style={styles.musicInfo}>
            <span style={styles.musicTitle}>{playlist[songIndex].title}</span>
            <span style={styles.musicArtist}>{playlist[songIndex].artist}</span>
          </div>
          <button
            style={styles.musicBtn}
            onClick={() => {
              if (!audioRef.current) return;
              if (isPlaying) {
                audioRef.current.pause();
              } else {
                audioRef.current.play().catch(() => {});
              }
            }}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button
            style={{...styles.musicBtn, fontSize: '11px'}}
            onClick={handleNextSong}
            title="Next song"
          >
            ⏭
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatBtn {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }
        @keyframes pulseSeal {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.07); }
        }
        @keyframes noteBounce {
          0%, 100% { transform: translateY(0px) rotate(-8deg); }
          50%       { transform: translateY(-4px) rotate(8deg); }
        }
        @keyframes readyRise {
          from { transform: translateY(12px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        .mimi-open-btn {
          transition: background 0.2s ease, color 0.2s ease, transform 0.18s ease, box-shadow 0.18s ease !important;
        }
        .mimi-open-btn:hover {
          background: rgba(107, 58, 31, 0.08) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 24px rgba(107, 58, 31, 0.18) !important;
          animation-play-state: paused !important;
        }

        .mimi-fold-btn {
          transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease !important;
        }
        .mimi-fold-btn:hover {
          background: rgba(107, 58, 31, 0.06) !important;
          border-color: rgba(107, 58, 31, 0.55) !important;
          color: rgba(107, 58, 31, 0.85) !important;
        }

        @media (max-width: 640px) {
          .mimi-letter-content {
            padding: 0 14px 0 22px !important;
          }
          .mimi-open-btn {
            padding: 12px 32px !important;
            font-size: 16px !important;
          }
        }

        @media (max-width: 360px) {
          .mimi-letter-content {
            padding: 0 10px 0 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f0e6d3',
    backgroundImage: `
      radial-gradient(ellipse at 15% 15%, rgba(210,180,140,0.4) 0%, transparent 55%),
      radial-gradient(ellipse at 85% 85%, rgba(188,143,143,0.25) 0%, transparent 55%)
    `,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px 14px',
    fontFamily: "'Lora', Georgia, serif",
    boxSizing: 'border-box',
  },

  /* Envelope */
  envelopeWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '28px',
    width: '100%',
    maxWidth: '340px',
  },
  preLabel: {
    fontFamily: "'Caveat', cursive",
    fontSize: '22px',
    color: '#7a5c3a',
    margin: 0,
    letterSpacing: '0.5px',
    opacity: 0.85,
    textAlign: 'center',
  },
  openBtn: {
    background: 'transparent',
    border: '2px solid #6b3a1f',
    borderRadius: '50px',
    padding: '13px 42px',
    cursor: 'pointer',
    fontFamily: "'Lora', serif",
    fontSize: '18px',
    color: '#6b3a1f',
    letterSpacing: '0.5px',
    animation: 'floatBtn 2.2s ease-in-out infinite',
    transition: 'background 0.2s, color 0.2s',
  },
  openingText: {
    fontFamily: "'Caveat', cursive",
    fontSize: '26px',
    color: '#6b3a1f',
    letterSpacing: '3px',
    margin: 0,
    opacity: 0.7,
  },

  /* Letter */
  letterWrapper: {
    width: '100%',
    maxWidth: '640px',
    animation: 'fadeUp 0.9s ease-out both',
    paddingBottom: '90px',
  },
  letterPage: {
    background: '#fffdf6',
    borderRadius: '2px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.14)',
    position: 'relative',
    overflow: 'auto',
    paddingTop: '48px',
    paddingBottom: '44px',
  },
  letterContent: {
    position: 'relative',
    zIndex: 1,
    padding: '0 22px 0 58px',
  },
  letterMetaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
    marginBottom: '20px',
  },
  privateTag: {
    color: '#7d6152',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    fontFamily: "'Lora', serif",
  },
  dateText: {
    fontFamily: "'Lora', serif",
    fontSize: '14px',
    color: '#8a7265',
    margin: 0,
  },
  salutation: {
    fontFamily: "'Caveat', cursive",
    fontSize: 'clamp(38px, 10vw, 56px)',
    fontWeight: 700,
    color: '#3d2b1f',
    marginBottom: '26px',
    marginTop: '0',
    lineHeight: 1.05,
    letterSpacing: '0.3px',
  },
  para: {
    fontSize: '16px',
    color: '#4a3728',
    lineHeight: '2.0',
    marginBottom: '20px',
    marginTop: '0',
    fontFamily: "'Lora', Georgia, serif",
  },
  highlightBox: {
    borderLeft: '4px solid #b71c1c',
    background: 'rgba(183,28,28,0.04)',
    padding: '15px 18px',
    margin: '28px 0',
    borderRadius: '0 6px 6px 0',
  },
  highlightText: {
    fontSize: '16px',
    color: '#6b1010',
    lineHeight: '1.9',
    margin: '0',
    fontStyle: 'italic',
    fontFamily: "'Lora', Georgia, serif",
  },
  signatureArea: {
    marginTop: '36px',
    marginBottom: '22px',
    textAlign: 'right',
    borderTop: '1px solid rgba(180,160,130,0.4)',
    paddingTop: '20px',
  },
  signatureLine: {
    fontFamily: "'Caveat', cursive",
    fontSize: '22px',
    color: '#4a3728',
    margin: '0 0 4px 0',
  },
  signatureName: {
    fontFamily: "'Caveat', cursive",
    fontSize: '32px',
    color: '#3d2b1f',
    margin: '0 0 4px 0',
    fontWeight: 700,
  },
  signatureHint: {
    fontSize: '13px',
    color: '#c0b0a0',
    fontStyle: 'italic',
    margin: '0',
    fontFamily: "'Lora', serif",
  },
  foldBackBtn: {
    background: 'transparent',
    border: '1.5px solid rgba(107,58,31,0.4)',
    borderRadius: '50px',
    padding: '10px 28px',
    cursor: 'pointer',
    fontFamily: "'Lora', serif",
    fontSize: '14px',
    color: 'rgba(107,58,31,0.6)',
    letterSpacing: '0.3px',
    transition: 'all 0.2s',
    WebkitTapHighlightColor: 'transparent',
  },

  /* Music player */
  musicPlayer: {
    position: 'fixed',
    bottom: '12px',
    right: '10px',
    left: '10px',
    maxWidth: '280px',
    marginLeft: 'auto',
    background: 'rgba(255,253,246,0.97)',
    borderRadius: '50px',
    padding: '8px 12px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
    border: '1px solid rgba(180,160,130,0.35)',
    zIndex: 999,
    fontFamily: "'Lora', serif",
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  musicBtn: {
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
  musicNote: {
    fontSize: '17px',
    color: '#b71c1c',
    animation: 'noteBounce 1.2s ease-in-out infinite',
    display: 'inline-block',
  },
  musicInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
  },
  musicTitle: {
    fontSize: '12px',
    color: '#3d2b1f',
    fontWeight: '600',
    lineHeight: 1.3,
  },
  musicArtist: {
    fontSize: '10px',
    color: '#9a7a5a',
    lineHeight: 1.3,
  },
};

export default IfYoureReady;