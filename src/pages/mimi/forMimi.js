import React, { useState, useEffect } from 'react';

const ForMimi = () => {
  const [stage, setStage] = useState('envelope'); // envelope → opening → letter
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleOpenEnvelope = () => {
    setStage('opening');
    setTimeout(() => setStage('letter'), 1200);
  };

  const handleFoldBack = () => {
    setIsPlaying(false);
    setStage('opening');
    setTimeout(() => setStage('envelope'), 800);
  };

  const ENV_W = 300;
  const ENV_H = 195;

  return (
    <div style={styles.page}>

      {/* ── ENVELOPE STAGE ── */}
      {(stage === 'envelope' || stage === 'opening') && (
        <div style={styles.envelopeWrapper}>
          <p style={styles.preLabel}>You have a new letter</p>

          {/* Envelope body */}
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
                <span style={{ fontFamily: "'Caveat', cursive", fontSize: '8px', color: '#6b3a1f', letterSpacing: '0.5px' }}>LOVE</span>
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
            <button style={styles.openBtn} onClick={handleOpenEnvelope}>
              Open letter  ↑
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

            <div style={styles.letterContent}>
              <p style={styles.dateText}>February 26, 2026</p>
              <p style={styles.salutation}>Dear Mimi,</p>

              <p style={styles.para}>
                You wanted something formal. So I built you a whole website. With a wax seal.
                I think that's formal enough.
              </p>

              <p style={styles.para}>
                Here it is, officially: I want us to be together — properly, not just
                the "we're a thing I guess" kind of way. You and me. For real this time.
              </p>

              <div style={styles.highlightBox}>
                <p style={styles.highlightText}>
                  Yes, I know the distance is hard. I'm choosing you anyway.
                  You're worth the late nights, the waiting, and every game
                  we've played together just to have a reason to stay up late.
                </p>
              </div>

              <p style={styles.para}>
                So next time someone asks "what are you two?" — you can just send them this link.
                That's what this is. My answer. In writing. On the internet. Very official.
              </p>

              <p style={styles.para}>
                You are my person, Mimi. Even from far away.
              </p>

              <div style={styles.signatureArea}>
                <p style={styles.signatureLine}>Yours, officially and completely,</p>
                <p style={styles.signatureName}>— The guy who coded a love letter instead of just texting you</p>
                <p style={styles.signatureHint}>(Yes, I mean every word. No, I'm not nervous. Okay, a little. wkwkwkwk)</p>
              </div>

              <div style={styles.psArea}>
                <p style={styles.psText}>P.S. You wanted formal — I gave you a wax seal and ruled paper. You're welcome.</p>
                <p style={styles.psText}>P.P.S. The distance is annoying. But giving up on you would be worse. ♥</p>
              </div>

              {/* Fold back button */}
              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <button style={styles.foldBackBtn} onClick={handleFoldBack}>
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
          {/* iframe only mounts when user taps play — direct user gesture = works on mobile */}
          {isPlaying && (
            <iframe
              key="yt"
              title="bg-music"
              width="1" height="1"
              src="https://www.youtube.com/embed/Jhh2y-1JVZE?autoplay=1&loop=1&playlist=Jhh2y-1JVZE"
              allow="autoplay; encrypted-media"
              style={{ position: 'fixed', bottom: 0, right: 0, opacity: 0.01, pointerEvents: 'none' }}
            />
          )}
          <span style={{ ...styles.musicNote, animationPlayState: isPlaying ? 'running' : 'paused' }}>♪</span>
          <div style={styles.musicInfo}>
            <span style={styles.musicTitle}>Lucky</span>
            <span style={styles.musicArtist}>Jason Mraz ft. Colbie Caillat</span>
          </div>
          <button
            style={styles.musicBtn}
            onClick={() => setIsPlaying(p => !p)}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');

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
  },
  preLabel: {
    fontFamily: "'Caveat', cursive",
    fontSize: '22px',
    color: '#7a5c3a',
    margin: 0,
    letterSpacing: '0.5px',
    opacity: 0.85,
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
    paddingBottom: '100px',
  },
  letterPage: {
    background: '#fffdf6',
    borderRadius: '2px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.14)',
    position: 'relative',
    overflow: 'hidden',
    paddingTop: '48px',
    paddingBottom: '44px',
  },
  letterContent: {
    position: 'relative',
    zIndex: 1,
    padding: '0 22px 0 58px',
  },
  dateText: {
    fontFamily: "'Caveat', cursive",
    fontSize: '15px',
    color: '#b0a090',
    textAlign: 'right',
    marginBottom: '24px',
    marginTop: '0',
  },
  salutation: {
    fontFamily: "'Caveat', cursive",
    fontSize: '30px',
    color: '#3d2b1f',
    marginBottom: '26px',
    marginTop: '0',
    fontWeight: '700',
  },
  para: {
    fontSize: '16px',
    color: '#4a3728',
    lineHeight: '2.0',
    marginBottom: '20px',
    marginTop: '0',
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
    fontSize: '15px',
    color: '#999',
    margin: '0 0 4px 0',
  },
  signatureHint: {
    fontSize: '13px',
    color: '#c0b0a0',
    fontStyle: 'italic',
    margin: '0',
  },
  psArea: {
    background: 'rgba(183,28,28,0.03)',
    borderRadius: '6px',
    padding: '15px 18px',
    marginTop: '18px',
    border: '1px dashed rgba(183,28,28,0.18)',
  },
  psText: {
    fontSize: '14px',
    color: '#7a4a3a',
    fontStyle: 'italic',
    margin: '6px 0',
    lineHeight: '1.75',
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
    bottom: '18px',
    right: '14px',
    background: 'rgba(255,253,246,0.96)',
    borderRadius: '50px',
    padding: '10px 14px 10px 12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.16)',
    border: '1px solid rgba(180,160,130,0.35)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    zIndex: 999,
    fontFamily: "'Lora', serif",
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
  musicBtn: {
    background: '#b71c1c',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    cursor: 'pointer',
    color: 'white',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    WebkitTapHighlightColor: 'transparent',
  },
};

export default ForMimi;
