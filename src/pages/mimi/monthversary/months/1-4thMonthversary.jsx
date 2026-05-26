import React, { useState, useEffect } from 'react';
import MusicPlayer from '../MusicPlayer';

const UNLOCK_DATE = new Date('2026-05-26T00:00:00');

const playlist = [
  { title: 'River Flows In You', artist: 'Yiruma', src: "https://archive.org/download/yiruma-frame-2017/Yiruma%20-%20Frame%20(2017)/11.%20River%20Flows%20In%20You%20('f%20r%20a%20m%20e'%20Ver.).mp3" },
];

// ── TYPEWRITER MESSAGE COMPONENT ──
const messageBlocks = [
  { type: 'badge', text: '4 months of us' },
  { type: 'title', text: 'Happy 4th Monthversary' },
  { type: 'para', text: 'Four months ago, something started. I didn\'t know then what it would become, but I know now that it\'s the best thing that\'s happened to me in a long time.' },
  { type: 'para', text: 'This month tested us. We went through the hard part, and the fact that we made it through together. That means everything to me.' },
  { type: 'highlight', text: 'You\'re not just my favorite person, you\'re the one I want to keep choosing, every single month, even when it\'s hard.' },
  { type: 'para', text: 'I don\'t know what next month looks like. But I know I want to find out with you.' },
  { type: 'signature', lines: ['Yours, always', '— Gagas', '(The guy who do it all, just for you)'] },
  { type: 'ps', text: 'P.S. Next month will be different. You\'ll have to wait. ♥' },
  { type: 'gift' },
];

const TypewriterMessage = ({ playlist }) => {
  const [visibleBlocks, setVisibleBlocks] = useState(0);
  const [typedWords, setTypedWords] = useState({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (visibleBlocks >= messageBlocks.length) {
      setDone(true);
      return;
    }

    const block = messageBlocks[visibleBlocks];
    const words = block.type === 'badge' || block.type === 'title' || block.type === 'signature' || block.type === 'ps' || block.type === 'gift'
      ? [] // These appear instantly, no typewriter
      : block.text.split(' ');

    if (words.length === 0) {
      // Instant reveal for non-typewriter blocks
      const delay = block.type === 'title' ? 800 : block.type === 'gift' ? 1200 : 400;
      const timer = setTimeout(() => {
        setVisibleBlocks((v) => v + 1);
      }, delay);
      return () => clearTimeout(timer);
    }

    // Type word by word
    let wordIndex = 0;
    const typeInterval = setInterval(() => {
      wordIndex++;
      setTypedWords((prev) => ({ ...prev, [visibleBlocks]: wordIndex }));
      if (wordIndex >= words.length) {
        clearInterval(typeInterval);
        setTimeout(() => {
          setVisibleBlocks((v) => v + 1);
        }, block.type === 'highlight' ? 1200 : 600);
      }
    }, block.type === 'highlight' ? 70 : 50);

    return () => clearInterval(typeInterval);
  }, [visibleBlocks]);

  const getVisibleText = (blockIndex) => {
    const block = messageBlocks[blockIndex];
    const totalWords = block.text.split(' ');
    const shown = typedWords[blockIndex] || 0;
    return totalWords.slice(0, shown).join(' ');
  };

  return (
    <div style={styles.page}>
      <div style={styles.messageWrapper}>
        <div style={styles.messageCard}>
          {messageBlocks.slice(0, visibleBlocks + 1).map((block, i) => {
            const isVisible = i <= visibleBlocks;
            const isTyping = i === visibleBlocks && typedWords[i] !== undefined;
            const isComplete = i < visibleBlocks || !isTyping;

            if (block.type === 'badge') {
              return <p key={i} style={{ ...styles.messageBadge, animation: 'fadeUp 0.5s ease-out both' }}>{block.text}</p>;
            }
            if (block.type === 'title') {
              return <h2 key={i} style={{ ...styles.messageTitle, animation: 'fadeUp 0.6s ease-out both' }}>{block.text}</h2>;
            }
            if (block.type === 'para') {
              return (
                <p key={i} style={{ ...styles.messagePara, opacity: isVisible ? 1 : 0 }}>
                  {getVisibleText(i)}
                  {isTyping && <span style={styles.cursor}>|</span>}
                </p>
              );
            }
            if (block.type === 'highlight') {
              return (
                <div key={i} style={{ ...styles.messageHighlight, opacity: isVisible ? 1 : 0 }}>
                  <p style={styles.messageHighlightText}>
                    {getVisibleText(i)}
                    {isTyping && <span style={styles.cursor}>|</span>}
                  </p>
                </div>
              );
            }
            if (block.type === 'signature') {
              return (
                <div key={i} style={{ ...styles.messageSignature, animation: 'fadeUp 0.5s ease-out both' }}>
                  <p style={styles.messageSigLine}>{block.lines[0]}</p>
                  <p style={styles.messageSigName}>{block.lines[1]}</p>
                  <p style={styles.messageSigHint}>{block.lines[2]}</p>
                </div>
              );
            }
            if (block.type === 'ps') {
              return (
                <div key={i} style={{ ...styles.messagePS, animation: 'fadeUp 0.5s ease-out both' }}>
                  <p style={styles.messagePSText}>{block.text}</p>
                </div>
              );
            }
            if (block.type === 'gift') {
              const waMessage = encodeURIComponent('Hey you... I\'ve been thinking, what if...');
              return (
                <div key={i} style={{ ...styles.giftSection, animation: 'fadeUp 0.6s ease-out both' }}>
                  <p style={styles.giftPrompt}>One more thing...</p>
                  <p style={styles.giftSubtext}>I've been wondering what would make you smile right now. No pressure, just... curious.</p>
                  <p style={styles.giftHint}>If anything comes to mind, you know where to find me</p>
                  <a
                    href={`https://wa.me/6285810840979?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.waButton}
                  >
                    tell me here
                  </a>
                  <p style={styles.giftFooter}>even the smallest thing you mention, I'll remember</p>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      {done && <MusicPlayer playlist={playlist} startIndex={0} />}

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes revealIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </div>
  );
};

const FourthMonthversary = () => {
  const [stage, setStage] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [now, setNow] = useState(new Date());

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

  const handleTap = () => {
    if (transitioning || stage >= 5) return;
    setTransitioning(true);

    if (stage === 4) {
      // Final unwrap — trigger sparkle + reveal
      setShowSparkle(true);
      setTimeout(() => {
        setStage(5);
        setTransitioning(false);
        setShowSparkle(false);
      }, 800);
    } else {
      setTimeout(() => {
        setStage(stage + 1);
        setTransitioning(false);
      }, 600);
    }
  };

  // ── COUNTDOWN ──
  if (isLocked) {
    const days = Math.max(0, Math.floor((UNLOCK_DATE - now) / (1000 * 60 * 60 * 24)));
    const hours = Math.max(0, Math.floor(((UNLOCK_DATE - now) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const minutes = Math.max(0, Math.floor(((UNLOCK_DATE - now) % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = Math.max(0, Math.floor(((UNLOCK_DATE - now) % (1000 * 60)) / 1000));

    return (
      <div style={styles.page}>
        <div style={styles.countdownWrapper}>
          <p style={styles.countdownLabel}>4th monthversary</p>
          <h1 style={styles.countdownTitle}>Not yet</h1>
          <p style={styles.countdownSub}>Come back on May 26</p>
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
          <p style={styles.countdownHint}>Patience is part of the gift.</p>
        </div>
        <style>{`
          @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    );
  }

  // ── REVEALED MESSAGE (typewriter) ──
  if (stage === 5) {
    return <TypewriterMessage playlist={playlist} />;
  }

  // ── GIFT UNWRAP ──
  return (
    <div style={styles.page}>
      <div style={styles.giftWrapper}>
        <p style={styles.giftTopLabel}>4th monthversary</p>

        <div style={styles.giftContainer} onClick={handleTap}>
          {/* Sparkle burst */}
          {showSparkle && (
            <div style={styles.sparkleContainer}>
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.sparkle,
                    '--angle': `${i * 30}deg`,
                    '--distance': `${60 + Math.random() * 40}px`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* The box itself */}
          <div style={{
            ...styles.boxBody,
            ...(transitioning ? styles.boxBodyShake : {}),
          }}>
            {/* Box base color */}
            <div style={styles.boxBase} />

            {/* Vertical ribbon */}
            <div style={{
              ...styles.ribbonVertical,
              opacity: stage < 2 ? 1 : 0,
              transform: stage >= 2 ? 'scaleX(0)' : 'scaleX(1)',
            }} />

            {/* Horizontal ribbon */}
            <div style={{
              ...styles.ribbonHorizontal,
              opacity: stage < 2 ? 1 : 0,
              transform: stage >= 2 ? 'scaleY(0)' : 'scaleY(1)',
            }} />

            {/* Ribbon bow */}
            <div style={{
              ...styles.ribbonBow,
              opacity: stage < 2 ? 1 : 0,
              transform: stage >= 2 ? 'scale(0) rotate(180deg)' : 'scale(1) rotate(0deg)',
            }}>
              <div style={styles.bowLeft} />
              <div style={styles.bowRight} />
              <div style={styles.bowCenter} />
            </div>

            {/* Wrapping paper — stage 0 only */}
            <div style={{
              ...styles.wrappingPaper,
              opacity: stage === 0 ? 1 : 0,
              transform: stage === 0 ? 'scale(1)' : 'scale(1.1)',
            }} />

            {/* Box lid — stages 0-2 */}
            <div style={{
              ...styles.boxLid,
              opacity: stage < 3 ? 1 : 0,
              transform: stage < 3 ? 'translateY(0) rotateX(0deg)' : 'translateY(-60px) rotateX(-45deg)',
              transformOrigin: 'top center',
            }}>
              <div style={styles.lidRibbon} />
            </div>

            {/* Tissue paper — stage 3 */}
            <div style={{
              ...styles.tissuePaper,
              opacity: stage === 3 ? 1 : 0,
              transform: stage === 3 ? 'translateY(0)' : 'translateY(-30px)',
            }}>
              <div style={styles.tissueFold1} />
              <div style={styles.tissueFold2} />
              <div style={styles.tissueFold3} />
            </div>

            {/* Glow from inside — stage 4 */}
            <div style={{
              ...styles.insideGlow,
              opacity: stage === 4 ? 1 : 0,
            }} />
          </div>

          {/* Tap prompt */}
          <p style={{
            ...styles.tapPrompt,
            opacity: transitioning ? 0 : 1,
          }}>
            {stage === 0 && 'Tap to unwrap'}
            {stage === 1 && 'Tap to untie the ribbon'}
            {stage === 2 && 'Tap to open the lid'}
            {stage === 3 && 'Tap to peek inside'}
            {stage === 4 && 'Tap to open'}
          </p>

          {/* Tease text */}
          {!transitioning && (
            <p style={styles.teaseText}>
              {stage === 0 && 'Go on... I dare you.'}
              {stage === 1 && 'Not so fast, enjoy it a little.'}
              {stage === 2 && 'Careful now...'}
              {stage === 3 && 'Almost there... or is it?'}
              {stage === 4 && 'This is it. Ready?'}
            </p>
          )}
        </div>

        {/* Progress */}
        <div style={styles.progressDots}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                ...styles.dot,
                ...(i < stage ? styles.dotDone : {}),
                ...(i === stage ? styles.dotCurrent : {}),
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes giftFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes shake { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-2deg); } 75% { transform: rotate(2deg); } }
        @keyframes sparkle {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(calc(cos(var(--angle)) * var(--distance)), calc(sin(var(--angle)) * var(--distance))) scale(0); opacity: 0; }
        }
        @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes tapFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
      `}</style>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0a0a0a',
    backgroundImage: `
      radial-gradient(ellipse at 30% 30%, rgba(183,28,28,0.08) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 70%, rgba(183,28,28,0.05) 0%, transparent 50%)
    `,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px 14px',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },

  /* Countdown */
  countdownWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    animation: 'fadeUp 0.8s ease-out both',
  },
  countdownLabel: {
    fontFamily: "'Caveat', cursive",
    fontSize: '20px',
    color: 'rgba(255,255,255,0.4)',
    margin: 0,
  },
  countdownTitle: {
    fontFamily: "'Lora', Georgia, serif",
    fontSize: 'clamp(42px, 10vw, 64px)',
    color: '#fff',
    margin: '0 0 8px 0',
    fontWeight: 600,
  },
  countdownSub: {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.4)',
    margin: '0 0 36px 0',
    fontStyle: 'italic',
  },
  countdownTimer: { display: 'flex', gap: '20px', marginBottom: '32px' },
  countdownUnit: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' },
  countdownValue: {
    fontFamily: "'Caveat', cursive",
    fontSize: '48px',
    color: '#b71c1c',
    fontWeight: 700,
    lineHeight: 1,
  },
  countdownLabelSmall: {
    fontFamily: "'Caveat', cursive",
    fontSize: '14px',
    color: 'rgba(255,255,255,0.35)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  countdownHint: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.3)',
    fontStyle: 'italic',
    margin: 0,
  },

  /* Gift */
  giftWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '28px',
    animation: 'fadeUp 0.8s ease-out both',
  },
  giftTopLabel: {
    fontFamily: "'Caveat', cursive",
    fontSize: '20px',
    color: 'rgba(255,255,255,0.4)',
    margin: 0,
    letterSpacing: '0.5px',
  },
  giftContainer: {
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    animation: 'giftFloat 3s ease-in-out infinite',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  boxBody: {
    width: '220px',
    height: '200px',
    position: 'relative',
    borderRadius: '12px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
    transition: 'transform 0.6s ease',
  },
  boxBodyShake: {
    animation: 'shake 0.4s ease',
  },
  boxBase: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, #c0392b 0%, #b71c1c 50%, #8e1a1a 100%)',
    borderRadius: '12px',
  },
  ribbonVertical: {
    position: 'absolute',
    top: 0,
    left: '50%',
    width: '28px',
    height: '100%',
    background: 'linear-gradient(90deg, #d4a017 0%, #f4d03f 50%, #d4a017 100%)',
    transform: 'translateX(-50%)',
    zIndex: 2,
    transition: 'all 0.6s ease',
  },
  ribbonHorizontal: {
    position: 'absolute',
    top: '50%',
    left: 0,
    width: '100%',
    height: '28px',
    background: 'linear-gradient(180deg, #d4a017 0%, #f4d03f 50%, #d4a017 100%)',
    transform: 'translateY(-50%)',
    zIndex: 2,
    transition: 'all 0.6s ease',
  },
  ribbonBow: {
    position: 'absolute',
    top: '-20px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 3,
    transition: 'all 0.6s ease',
  },
  bowLeft: {
    position: 'absolute',
    top: '0',
    left: '-22px',
    width: '30px',
    height: '24px',
    background: '#f4d03f',
    borderRadius: '50% 50% 10% 50%',
    transform: 'rotate(-20deg)',
  },
  bowRight: {
    position: 'absolute',
    top: '0',
    right: '-22px',
    width: '30px',
    height: '24px',
    background: '#f4d03f',
    borderRadius: '50% 50% 50% 10%',
    transform: 'rotate(20deg)',
  },
  bowCenter: {
    position: 'relative',
    width: '20px',
    height: '16px',
    background: '#d4a017',
    borderRadius: '4px',
    zIndex: 1,
  },
  wrappingPaper: {
    position: 'absolute',
    inset: 0,
    background: `
      repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.06) 10px, rgba(255,255,255,0.06) 20px),
      linear-gradient(135deg, #d43f2f 0%, #c0392b 100%)
    `,
    borderRadius: '12px',
    zIndex: 4,
    transition: 'all 0.6s ease',
  },
  boxLid: {
    position: 'absolute',
    top: '-16px',
    left: '-6px',
    right: '-6px',
    height: '44px',
    background: 'linear-gradient(180deg, #b51a1a 0%, #9e1515 100%)',
    borderRadius: '14px 14px 4px 4px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
    zIndex: 5,
    transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  lidRibbon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '28px',
    height: '100%',
    background: 'linear-gradient(90deg, #d4a017 0%, #f4d03f 50%, #d4a017 100%)',
    transform: 'translate(-50%, -50%)',
  },
  tissuePaper: {
    position: 'absolute',
    inset: '0',
    zIndex: 4,
    transition: 'all 0.6s ease',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: '12px',
  },
  tissueFold1: {
    position: 'absolute',
    top: '-10px',
    left: '30%',
    width: '50px',
    height: '80px',
    background: 'rgba(255,255,255,0.85)',
    borderRadius: '0 0 50% 50%',
    transform: 'rotate(-10deg)',
  },
  tissueFold2: {
    position: 'absolute',
    top: '-10px',
    left: '50%',
    width: '45px',
    height: '90px',
    background: 'rgba(255,255,255,0.75)',
    borderRadius: '0 0 50% 50%',
    transform: 'translateX(-50%) rotate(5deg)',
  },
  tissueFold3: {
    position: 'absolute',
    top: '-10px',
    right: '30%',
    width: '50px',
    height: '75px',
    background: 'rgba(255,255,255,0.8)',
    borderRadius: '0 0 50% 50%',
    transform: 'rotate(12deg)',
  },
  insideGlow: {
    position: 'absolute',
    inset: '10%',
    background: 'radial-gradient(circle, rgba(244,208,63,0.3) 0%, transparent 70%)',
    borderRadius: '50%',
    zIndex: 3,
    transition: 'opacity 0.6s ease',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  tapPrompt: {
    fontFamily: "'Caveat', cursive",
    fontSize: '18px',
    color: 'rgba(255,255,255,0.5)',
    margin: '20px 0 0 0',
    textAlign: 'center',
    animation: 'tapFloat 2s ease-in-out infinite',
    transition: 'opacity 0.3s ease',
  },
  teaseText: {
    fontFamily: "'Caveat', cursive",
    fontSize: '15px',
    color: 'rgba(255,255,255,0.25)',
    margin: '6px 0 0 0',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  progressDots: {
    display: 'flex',
    gap: '10px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.15)',
    transition: 'all 0.3s ease',
  },
  dotDone: {
    background: '#b71c1c',
    boxShadow: '0 0 8px rgba(183,28,28,0.5)',
  },
  dotCurrent: {
    background: 'rgba(255,255,255,0.5)',
    transform: 'scale(1.3)',
  },

  /* Sparkle */
  sparkleContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
    pointerEvents: 'none',
  },
  sparkle: {
    position: 'absolute',
    width: '6px',
    height: '6px',
    background: '#f4d03f',
    borderRadius: '50%',
    animation: 'sparkle 0.8s ease-out forwards',
  },

  /* Revealed message */
  messageWrapper: {
    width: '100%',
    maxWidth: '520px',
    animation: 'revealIn 0.7s ease-out both',
    paddingBottom: '80px',
  },
  messageCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px',
    padding: '32px 28px',
    backdropFilter: 'blur(10px)',
  },
  messageBadge: {
    display: 'inline-block',
    fontFamily: "'Caveat', cursive",
    fontSize: '14px',
    color: '#b71c1c',
    background: 'rgba(183,28,28,0.1)',
    border: '1px solid rgba(183,28,28,0.2)',
    borderRadius: '20px',
    padding: '4px 14px',
    marginBottom: '20px',
  },
  messageTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(32px, 8vw, 48px)',
    color: '#fff',
    margin: '0 0 24px 0',
    fontWeight: 700,
    lineHeight: 1.1,
  },
  messagePara: {
    fontSize: '15px',
    color: 'rgba(255,255,255,0.7)',
    lineHeight: '1.9',
    marginBottom: '18px',
    marginTop: 0,
    fontFamily: "'Lora', Georgia, serif",
  },
  messageHighlight: {
    borderLeft: '3px solid #b71c1c',
    background: 'rgba(183,28,28,0.08)',
    padding: '16px 18px',
    margin: '24px 0',
    borderRadius: '0 10px 10px 0',
  },
  messageHighlightText: {
    fontSize: '15px',
    color: 'rgba(255,200,200,0.85)',
    lineHeight: '1.8',
    margin: 0,
    fontStyle: 'italic',
    fontFamily: "'Lora', Georgia, serif",
  },
  messageSignature: {
    textAlign: 'right',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    paddingTop: '20px',
    marginTop: '28px',
    marginBottom: '18px',
  },
  messageSigLine: {
    fontFamily: "'Caveat', cursive",
    fontSize: '20px',
    color: 'rgba(255,255,255,0.6)',
    margin: '0 0 4px 0',
  },
  messageSigName: {
    fontFamily: "'Caveat', cursive",
    fontSize: '14px',
    color: 'rgba(255,255,255,0.35)',
    margin: '0 0 4px 0',
  },
  messageSigHint: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.2)',
    fontStyle: 'italic',
    margin: '0',
  },
  messagePS: {
    background: 'rgba(183,28,28,0.06)',
    borderRadius: '10px',
    padding: '14px 16px',
    border: '1px dashed rgba(183,28,28,0.2)',
  },
  messagePSText: {
    fontSize: '13px',
    color: 'rgba(255,200,200,0.6)',
    fontStyle: 'italic',
    margin: 0,
    fontFamily: "'Lora', Georgia, serif",
  },

  /* Gift / WhatsApp section */
  giftSection: {
    textAlign: 'center',
    marginTop: '28px',
    paddingTop: '24px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  giftPrompt: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '22px',
    color: '#fff',
    margin: '0 0 8px 0',
    fontWeight: 600,
  },
  giftSubtext: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.5)',
    lineHeight: '1.8',
    margin: '0 0 12px 0',
    fontFamily: "'Lora', Georgia, serif",
  },
  giftHint: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.35)',
    margin: '0 0 20px 0',
    fontStyle: 'italic',
    fontFamily: "'Lora', Georgia, serif",
  },
  waButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '14px 28px',
    background: 'rgba(183,28,28,0.85)',
    color: '#fff',
    borderRadius: '50px',
    fontSize: '15px',
    fontWeight: 600,
    fontFamily: "'Lora', Georgia, serif",
    textDecoration: 'none',
    boxShadow: '0 4px 20px rgba(183,28,28,0.25)',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255,255,255,0.1)',
    letterSpacing: '0.5px',
  },
  giftFooter: {
    fontFamily: "'Caveat', cursive",
    fontSize: '15px',
    color: 'rgba(255,255,255,0.25)',
    margin: '16px 0 0 0',
    fontStyle: 'italic',
  },

  cursor: {
    color: '#b71c1c',
    fontWeight: 300,
    animation: 'blink 0.8s ease-in-out infinite',
    marginLeft: '2px',
  },
};

export default FourthMonthversary;
