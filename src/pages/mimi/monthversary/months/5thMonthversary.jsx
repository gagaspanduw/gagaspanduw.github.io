import React, { useState, useEffect, useRef } from 'react';
import MusicPlayer from '../MusicPlayer';

const UNLOCK_DATE = new Date('2026-07-26T00:00:00');
const STAR_UNLOCK_EVENT = 'monthversary-star-unlock';

const playlist = [
  { title: 'Vow', artist: 'Coldiac', src: '/music/coldiac-vow.mp3' },
];

const stars = [
  { text: 'Five months ago, I didn\'t know my whole sky was about to change.', x: 18, y: 14 },
  { text: 'Five months feels like a five minutes, and i need a hundred more.', x: 70, y: 20 },
  { text: 'I love that we can be weird together and call it normal.', x: 35, y: 45 },
  { text: 'Thank you for loving me even on days I forget to love myself.', x: 75, y: 60 },
  { text: 'Five months. And you are still my favorite constellation.', x: 30, y: 78 },
];

const MAPS_URL = 'https://maps.google.com/?q=4J57%2BQ68+Buhangin,+Davao+City,+Philippines';

const FifthMonthversary = () => {
  const [now, setNow] = useState(new Date());
  const [tappedStars, setTappedStars] = useState([]);
  const [currentStar, setCurrentStar] = useState(null);
  const [showConstellation, setShowConstellation] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [constellationStep, setConstellationStep] = useState(0);
  const musicUnlocked = useRef(false);

  const isLocked = now < UNLOCK_DATE;

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!document.getElementById('monthversary-fonts')) {
      const link = document.createElement('link');
      link.id = 'monthversary-fonts';
      link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Lora:ital,wght@0,400;0,600;1,400&family=Cormorant+Garamond:wght@500;600;700&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, []);

  const handleTapStar = (index) => {
    if (currentStar !== null || showConstellation || showFinal) return;
    if (tappedStars.includes(index)) return;

    if (!musicUnlocked.current) {
      musicUnlocked.current = true;
      window.dispatchEvent(new Event(STAR_UNLOCK_EVENT));
    }

    setCurrentStar(index);
  };

  const handleCloseStar = () => {
    const newTapped = [...tappedStars, currentStar];
    setTappedStars(newTapped);
    setCurrentStar(null);

    if (newTapped.length === stars.length) {
      setTimeout(() => setShowConstellation(true), 800);
      setTimeout(() => setConstellationStep(1), 1600);
      setTimeout(() => setConstellationStep(2), 2800);
      setTimeout(() => setConstellationStep(3), 4000);
      setTimeout(() => setConstellationStep(4), 5200);
      setTimeout(() => setConstellationStep(5), 6400);
      setTimeout(() => setShowFinal(true), 11000);
    }
  };

  // ── COUNTDOWN ──
  if (isLocked) {
    const diff = UNLOCK_DATE - now;
    const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
    const hours = Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const minutes = Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = Math.max(0, Math.floor((diff % (1000 * 60)) / 1000));

    return (
      <div style={styles.page}>
        <div style={styles.countdownWrapper}>
          <p style={styles.countdownLabel}>5th monthversary</p>
          <h1 style={styles.countdownTitle}>Not yet</h1>
          <p style={styles.countdownSub}>Come back on July 26</p>
          <div style={styles.countdownTimer}>
            {[
              { value: days, label: 'days' },
              { value: hours, label: 'hrs' },
              { value: minutes, label: 'min' },
              { value: seconds, label: 'sec' },
            ].map((unit) => (
              <div key={unit.label} style={styles.countdownUnit}>
                <span style={styles.countdownValue}>{unit.value}</span>
                <span style={styles.countdownLabelSmall}>{unit.label}</span>
              </div>
            ))}
          </div>
          <p style={styles.countdownHint}>Look up. Something is written in the stars for you.</p>
        </div>
        <style>{`
          @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes twinkle { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.8; } }
        `}</style>
        {renderBgStars()}
      </div>
    );
  }

  function renderBgStars() {
    const bgStars = [];
    for (let i = 0; i < 50; i++) {
      bgStars.push(
        <div
          key={`bg-${i}`}
          style={{
            position: 'fixed',
            width: `${1 + (i % 3)}px`,
            height: `${1 + (i % 3)}px`,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.4)',
            left: `${(i * 13 + 7) % 100}%`,
            top: `${(i * 17 + 3) % 100}%`,
            animation: `twinkle ${2 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${(i * 0.4) % 3}s`,
            pointerEvents: 'none',
          }}
        />
      );
    }
    return bgStars;
  }

  const starsLeft = stars.length - tappedStars.length;

  return (
    <div style={styles.page}>
      {renderBgStars()}

      {/* ── STAR FIELD ── */}
      {!showConstellation && !showFinal && (
        <div style={styles.starField}>
          <p style={styles.topLabel}>5th monthversary</p>
          <h1 style={styles.sceneTitle}>A sky full of you</h1>
          <p style={styles.sceneSubtitle}>
            {starsLeft > 0
              ? `${starsLeft} star${starsLeft === 1 ? '' : 's'} still glowing. Tap each one.`
              : 'One last star is waiting for you.'}
          </p>

          <div style={styles.skyContainer}>
            {stars.map((star, i) => {
              const isTapped = tappedStars.includes(i);
              return (
                <div
                  key={i}
                  onClick={() => handleTapStar(i)}
                  style={{
                    ...styles.star,
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    opacity: isTapped ? 0.2 : 1,
                    transform: isTapped ? 'scale(0.5)' : 'scale(1)',
                    cursor: isTapped ? 'default' : 'pointer',
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill={isTapped ? 'rgba(255,255,255,0.15)' : '#E1BEE7'}>
                    <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4l-6.4 4.8L8 14 2 9.2h7.6L12 2z" />
                  </svg>
                  {!isTapped && <div style={styles.starGlow} />}
                </div>
              );
            })}
          </div>

          {/* Progress dots */}
          <div style={styles.progressDots}>
            {stars.map((_, i) => (
              <div
                key={i}
                style={{
                  ...styles.dot,
                  ...(tappedStars.includes(i) ? styles.dotRead : {}),
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── CONSTELLATION TRANSITION ── */}
      {showConstellation && !showFinal && (
        <div style={styles.constellationWrapper}>
          <svg width="240" height="220" viewBox="0 0 240 220" fill="none" style={{ overflow: 'visible' }}>
            {/* Lines connecting stars — appear as next star shows */}
            {constellationStep >= 2 && <line x1="120" y1="195" x2="45" y2="120" stroke="rgba(206,147,216,0.4)" strokeWidth="1" style={{ animation: 'lineIn 0.6s ease both' }} />}
            {constellationStep >= 3 && <line x1="45" y1="120" x2="60" y2="45" stroke="rgba(206,147,216,0.4)" strokeWidth="1" style={{ animation: 'lineIn 0.6s ease both' }} />}
            {constellationStep >= 4 && <line x1="60" y1="45" x2="120" y2="70" stroke="rgba(206,147,216,0.4)" strokeWidth="1" style={{ animation: 'lineIn 0.6s ease both' }} />}
            {constellationStep >= 4 && <line x1="120" y1="70" x2="180" y2="45" stroke="rgba(206,147,216,0.4)" strokeWidth="1" style={{ animation: 'lineIn 0.6s ease both' }} />}
            {constellationStep >= 5 && <line x1="180" y1="45" x2="195" y2="120" stroke="rgba(206,147,216,0.4)" strokeWidth="1" style={{ animation: 'lineIn 0.6s ease both' }} />}
            {constellationStep >= 5 && <line x1="195" y1="120" x2="120" y2="195" stroke="rgba(206,147,216,0.4)" strokeWidth="1" style={{ animation: 'lineIn 0.6s ease both' }} />}

            {/* Star 1 — bottom point */}
            {constellationStep >= 1 && (
              <g style={{ animation: 'starPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}>
                <circle cx="120" cy="195" r="4" fill="#E1BEE7" style={{ filter: 'drop-shadow(0 0 6px rgba(225,190,231,0.8))' }} />
              </g>
            )}
            {/* Star 2 — left */}
            {constellationStep >= 2 && (
              <g style={{ animation: 'starPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}>
                <circle cx="45" cy="120" r="4" fill="#E1BEE7" style={{ filter: 'drop-shadow(0 0 6px rgba(225,190,231,0.8))' }} />
              </g>
            )}
            {/* Star 3 — top left */}
            {constellationStep >= 3 && (
              <g style={{ animation: 'starPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}>
                <circle cx="60" cy="45" r="4" fill="#E1BEE7" style={{ filter: 'drop-shadow(0 0 6px rgba(225,190,231,0.8))' }} />
              </g>
            )}
            {/* Star 4 — top middle dip */}
            {constellationStep >= 4 && (
              <g style={{ animation: 'starPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}>
                <circle cx="120" cy="70" r="4" fill="#E1BEE7" style={{ filter: 'drop-shadow(0 0 6px rgba(225,190,231,0.8))' }} />
                <circle cx="180" cy="45" r="4" fill="#E1BEE7" style={{ filter: 'drop-shadow(0 0 6px rgba(225,190,231,0.8))' }} />
              </g>
            )}
            {/* Star 5 — right */}
            {constellationStep >= 5 && (
              <g style={{ animation: 'starPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}>
                <circle cx="195" cy="120" r="4" fill="#E1BEE7" style={{ filter: 'drop-shadow(0 0 6px rgba(225,190,231,0.8))' }} />
              </g>
            )}
          </svg>
          <p style={{
            ...styles.constellationText,
            opacity: constellationStep >= 5 ? 1 : 0,
          }}>
            Every star was a reason. Together, they make you.
          </p>
        </div>
      )}

      {/* ── FINAL MESSAGE + BIRTHDAY SURPRISE ── */}
      {showFinal && (
        <div style={styles.finalWrapper}>
          <p style={styles.finalBadge}>5 months of us</p>
          <h1 style={styles.finalTitle}>Happy 5th Monthversary</h1>

          <div style={styles.finalCard}>
            <p style={styles.finalPara}>
              Five stars. Five months. Five reasons I kept choosing you, and honestly, I ran out of sky there are a thousand more I could have written.
            </p>
            <p style={styles.finalPara}>
              Five months with you and I still feel like I am in the beginning of something that does not have an ending. You make forever feel too short.
            </p>
            <p style={styles.finalHighlight}>
              You are not just someone in my sky. You are the whole sky. Every star, every color, every quiet night that feels like enough because you are in it.
            </p>
            <p style={styles.finalPara}>
              Here is to five months behind us, and every single one ahead. I am not going anywhere and i will gonna love you for the rest of my life.
            </p>
            <div style={styles.finalSignature}>
              <p style={styles.finalSigLine}>Yours, under every sky</p>
              <p style={styles.finalSigName}>— Gagas</p>
            </div>
          </div>

          {/* ── BIRTHDAY SURPRISE ── */}
          <div style={styles.surpriseSection}>
            <div style={styles.surpriseDivider}>
              <span style={styles.surpriseDividerStar}>&#10022;</span>
            </div>
            <p style={styles.surpriseLabel}>One more thing...</p>
            <h2 style={styles.surpriseTitle}>For your birthday</h2>
            <p style={styles.surpriseText}>
              I have something waiting for you. I won't say what it is yet, but I need you to be somewhere on your birthday.
            </p>
            <p style={styles.surpriseText}>
              Go here. Trust me.
            </p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.surpriseButton}
            >
              <span style={styles.surpriseButtonIcon}>&#9733;</span>
              Open the location
            </a>
            <p style={styles.surpriseHint}>
              Corner Tigatto, Buhangin-Cabantian-Indangan Rd, Buhangin, Davao City
            </p>
            <p style={styles.surprisePromise}>
              Be there on your birthday. That is all I will say for now.
            </p>
          </div>
        </div>
      )}

      {/* Star note overlay */}
      {currentStar !== null && (
        <div style={styles.noteOverlay} onClick={handleCloseStar}>
          <div style={styles.noteCard}>
            <div style={styles.noteStarIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#CE93D8">
                <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4l-6.4 4.8L8 14 2 9.2h7.6L12 2z" />
              </svg>
            </div>
            <p style={styles.noteText}>{stars[currentStar].text}</p>
            <p style={styles.noteTapClose}>Tap anywhere to let it stay in the sky</p>
          </div>
        </div>
      )}

      <MusicPlayer
        playlist={playlist}
        loop={true}
        autoplayOnMount={false}
        unlockEventName={STAR_UNLOCK_EVENT}
        showPromptUi={false}
      />

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes twinkle { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        @keyframes starFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes noteAppear { from { opacity: 0; transform: scale(0.6) translateY(30px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes glowPulse { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.4); } }
        @keyframes tapPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.7; } }
        @keyframes surpriseGlow { 0%, 100% { box-shadow: 0 0 20px rgba(206,147,216,0.2); } 50% { box-shadow: 0 0 40px rgba(206,147,216,0.4); } }
        @keyframes starPop { from { opacity: 0; transform: scale(0); } to { opacity: 1; transform: scale(1); } }
        @keyframes lineIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: '#050510',
    backgroundImage: `
      radial-gradient(ellipse at 20% 20%, rgba(103,58,183,0.08) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 70%, rgba(156,39,176,0.06) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(63,81,181,0.04) 0%, transparent 60%)
    `,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Lora', Georgia, serif",
    boxSizing: 'border-box',
    padding: '24px 16px',
    position: 'relative',
    overflow: 'hidden',
  },

  // ── Countdown ──
  countdownWrapper: {
    textAlign: 'center',
    animation: 'fadeUp 0.8s ease-out both',
    zIndex: 1,
  },
  countdownLabel: {
    fontFamily: "'Caveat', cursive",
    fontSize: '20px',
    color: 'rgba(255,255,255,0.3)',
    margin: '0 0 8px 0',
  },
  countdownTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(36px, 8vw, 52px)',
    color: '#CE93D8',
    margin: '0 0 8px 0',
    fontWeight: 600,
  },
  countdownSub: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.35)',
    margin: '0 0 32px 0',
  },
  countdownTimer: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  countdownUnit: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  countdownValue: {
    fontSize: '32px',
    fontWeight: 600,
    color: '#CE93D8',
  },
  countdownLabelSmall: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.3)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  countdownHint: {
    fontFamily: "'Caveat', cursive",
    fontSize: '18px',
    color: 'rgba(206,147,216,0.5)',
  },

  // ── Star field ──
  starField: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    animation: 'fadeUp 0.8s ease-out both',
    maxWidth: '420px',
    width: '100%',
    zIndex: 1,
  },
  topLabel: {
    fontFamily: "'Caveat', cursive",
    fontSize: '20px',
    color: 'rgba(255,255,255,0.3)',
    margin: '0 0 4px 0',
  },
  sceneTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(24px, 6vw, 34px)',
    color: '#CE93D8',
    margin: '0 0 6px 0',
    fontWeight: 600,
    textAlign: 'center',
  },
  sceneSubtitle: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.35)',
    margin: '0 0 24px 0',
    textAlign: 'center',
    fontStyle: 'italic',
  },

  skyContainer: {
    position: 'relative',
    width: '100%',
    height: '380px',
    borderRadius: '20px',
    background: 'radial-gradient(ellipse at 50% 30%, rgba(63,81,181,0.06) 0%, transparent 70%)',
    border: '1px solid rgba(255,255,255,0.04)',
  },
  star: {
    position: 'absolute',
    transition: 'all 0.5s ease',
    animation: 'starFloat 3s ease-in-out infinite',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starGlow: {
    position: 'absolute',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(206,147,216,0.3) 0%, transparent 70%)',
    animation: 'glowPulse 2s ease-in-out infinite',
    pointerEvents: 'none',
  },

  // ── Progress ──
  progressDots: {
    display: 'flex',
    gap: '8px',
    marginTop: '24px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.1)',
    transition: 'all 0.4s ease',
  },
  dotRead: {
    background: '#CE93D8',
    boxShadow: '0 0 8px rgba(206,147,216,0.6)',
    transform: 'scale(1.2)',
  },

  // ── Constellation ──
  constellationWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    minHeight: '60vh',
  },
  constellationText: {
    fontFamily: "'Caveat', cursive",
    fontSize: '22px',
    color: 'rgba(206,147,216,0.7)',
    marginTop: '24px',
    textAlign: 'center',
    transition: 'opacity 1.5s ease 0.5s',
  },

  // ── Note overlay ──
  noteOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(5,5,16,0.92)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
  },
  noteCard: {
    width: '85%',
    maxWidth: '340px',
    padding: '40px 28px 24px',
    borderRadius: '16px',
    background: 'rgba(206,147,216,0.06)',
    border: '1px solid rgba(206,147,216,0.2)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(206,147,216,0.1)',
    animation: 'noteAppear 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both',
    textAlign: 'center',
  },
  noteStarIcon: {
    marginBottom: '16px',
  },
  noteText: {
    fontFamily: "'Caveat', cursive",
    fontSize: '26px',
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 1.5,
    margin: 0,
  },
  noteTapClose: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.25)',
    marginTop: '20px',
    fontStyle: 'italic',
    marginBottom: 0,
  },

  // ── Final message ──
  finalWrapper: {
    maxWidth: '520px',
    width: '100%',
    animation: 'fadeUp 0.8s ease-out both',
    zIndex: 1,
  },
  finalBadge: {
    fontFamily: "'Caveat', cursive",
    fontSize: '20px',
    color: 'rgba(206,147,216,0.5)',
    textAlign: 'center',
    margin: '0 0 6px 0',
  },
  finalTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(28px, 7vw, 40px)',
    color: '#CE93D8',
    textAlign: 'center',
    margin: '0 0 28px 0',
    fontWeight: 600,
  },
  finalCard: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
    padding: '32px 28px',
    backdropFilter: 'blur(4px)',
  },
  finalPara: {
    fontSize: '15px',
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 1.8,
    margin: '0 0 18px 0',
    fontFamily: "'Lora', Georgia, serif",
  },
  finalHighlight: {
    fontSize: '17px',
    color: '#CE93D8',
    lineHeight: 1.7,
    margin: '0 0 18px 0',
    fontStyle: 'italic',
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 600,
  },
  finalSignature: {
    textAlign: 'right',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    paddingTop: '18px',
    marginTop: '12px',
  },
  finalSigLine: {
    fontFamily: "'Caveat', cursive",
    fontSize: '22px',
    color: 'rgba(255,255,255,0.55)',
    margin: '0 0 2px 0',
  },
  finalSigName: {
    fontFamily: "'Caveat', cursive",
    fontSize: '16px',
    color: 'rgba(255,255,255,0.3)',
    margin: 0,
  },

  // ── Birthday surprise ──
  surpriseSection: {
    marginTop: '40px',
    textAlign: 'center',
    animation: 'fadeUp 0.8s ease-out 0.4s both',
  },
  surpriseDivider: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '28px',
    position: 'relative',
  },
  surpriseDividerStar: {
    color: 'rgba(206,147,216,0.4)',
    fontSize: '18px',
    background: '#050510',
    padding: '0 16px',
    position: 'relative',
    zIndex: 1,
  },
  surpriseLabel: {
    fontFamily: "'Caveat', cursive",
    fontSize: '20px',
    color: 'rgba(255,255,255,0.4)',
    margin: '0 0 8px 0',
  },
  surpriseTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(22px, 5vw, 30px)',
    color: '#E1BEE7',
    margin: '0 0 16px 0',
    fontWeight: 600,
  },
  surpriseText: {
    fontSize: '15px',
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 1.8,
    margin: '0 0 12px 0',
  },
  surpriseButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '20px',
    padding: '14px 28px',
    background: 'linear-gradient(135deg, rgba(206,147,216,0.15) 0%, rgba(156,39,176,0.1) 100%)',
    border: '1px solid rgba(206,147,216,0.3)',
    borderRadius: '50px',
    color: '#E1BEE7',
    fontSize: '15px',
    fontFamily: "'Lora', Georgia, serif",
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    animation: 'surpriseGlow 3s ease-in-out infinite',
  },
  surpriseButtonIcon: {
    fontSize: '18px',
  },
  surpriseHint: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.25)',
    marginTop: '14px',
    fontStyle: 'italic',
  },
  surprisePromise: {
    fontFamily: "'Caveat', cursive",
    fontSize: '20px',
    color: 'rgba(206,147,216,0.6)',
    marginTop: '20px',
    marginBottom: 0,
  },
};

export default FifthMonthversary;
