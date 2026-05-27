import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import MusicPlayer from '../MusicPlayer';

const UNLOCK_DATE = new Date('2026-05-26T00:00:00');

const playlist = [
  { title: 'River Flows In You', artist: 'Yiruma', src: "https://archive.org/download/yiruma-frame-2017/Yiruma%20-%20Frame%20(2017)/11.%20River%20Flows%20In%20You%20('f%20r%20a%20m%20e'%20Ver.).mp3" },
];

const WHATSAPP_NUMBER = '6285810840979';
const INSTANT_BLOCK_TYPES = new Set(['badge', 'title', 'signature', 'ps', 'gift']);
const wishOptions = [
  { label: 'playing games together', message: 'Hey you ♥ right now I think playing games together with you would make me smile.' },
  { label: 'a tiny surprise', message: 'Hey you ♥ a tiny surprise from you would make me smile right now.' },
  { label: 'quality time with you', message: 'Hey you ♥ honestly, quality time with you would make me smile right now.' },
  { label: 'just call me', message: 'Hey you ♥ I think a call with you would make me smile right now.' },
];

const stageCopy = [
  { prompt: 'Tap to unwrap', tease: 'Go on... I dare you.' },
  { prompt: 'Tap to untie the ribbon', tease: 'Not so fast, enjoy it a little.' },
  { prompt: 'Tap to open the lid', tease: 'Careful now...' },
  { prompt: 'Tap to peek inside', tease: 'Almost there... or is it?' },
  { prompt: 'Tap to open', tease: 'This is it. Ready?' },
];

const buildWhatsAppLink = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const createSparkles = (count = 12) => Array.from({ length: count }, (_, i) => {
  const angle = ((Math.PI * 2) / count) * i + (Math.random() - 0.5) * 0.2;
  const distance = 58 + Math.random() * 42;
  return {
    id: `${Date.now()}-${i}`,
    tx: `${Math.cos(angle) * distance}px`,
    ty: `${Math.sin(angle) * distance}px`,
    delay: `${i * 0.04}s`,
  };
});

// ── TYPEWRITER MESSAGE COMPONENT ──
const messageBlocks = [
  { type: 'badge', text: '3 months of us' },
  { type: 'title', text: 'Happy 3rd Monthversary' },
  { type: 'para', text: 'Three months ago, something started. I didn\'t know then what it would become, but I know now that it\'s the best thing that\'s happened to me in a long time.' },
  { type: 'para', text: 'This month tested us. We went through the hard part, and the fact that we made it through together. That means everything to me.' },
  { type: 'highlight', text: 'You\'re not just my favorite person, you\'re the one I want to keep choosing, every single month, even when it\'s hard.' },
  { type: 'para', text: 'I don\'t know what next month looks like. But I know I want to find out with you.' },
  { type: 'signature', lines: ['Yours, always', '— Gagas', '(The guy who’d do all this, just for you)'] },
  { type: 'ps', text: 'P.S. Next month will be different. You\'ll have to wait. ♥' },
  { type: 'gift' },
];

const TypewriterMessage = ({ playlist, onReplay, onBack }) => {
  const [visibleBlocks, setVisibleBlocks] = useState(0);
  const [typedWords, setTypedWords] = useState({});
  const [done, setDone] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (visibleBlocks >= messageBlocks.length) {
      setDone(true);
      return;
    }

    const block = messageBlocks[visibleBlocks];
    const words = INSTANT_BLOCK_TYPES.has(block.type) ? [] : block.text.split(' ');

    if (words.length === 0) {
      const delay = block.type === 'title' ? 800 : block.type === 'gift' ? 1200 : 400;
      const timer = setTimeout(() => {
        setVisibleBlocks((v) => v + 1);
      }, delay);
      return () => clearTimeout(timer);
    }

    let wordIndex = 0;
    const typeInterval = setInterval(() => {
      wordIndex += 1;
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

  useEffect(() => {
    if (!bottomRef.current) return;
    bottomRef.current.scrollIntoView({ behavior: visibleBlocks > 0 ? 'smooth' : 'auto', block: 'end' });
  }, [visibleBlocks, done]);

  const revealAll = () => {
    const fullyTyped = {};
    messageBlocks.forEach((block, index) => {
      if (block.text) fullyTyped[index] = block.text.split(' ').length;
    });
    setTypedWords(fullyTyped);
    setVisibleBlocks(messageBlocks.length);
    setDone(true);
  };

  const getVisibleText = (blockIndex) => {
    const block = messageBlocks[blockIndex];
    const totalWords = block.text.split(' ');
    const shown = typedWords[blockIndex] || 0;
    return totalWords.slice(0, shown).join(' ');
  };

  return (
    <div style={styles.page}>
      <div style={styles.messageWrapper}>
        <div style={styles.topActionRow}>
          <button type="button" style={styles.secondaryButton} onClick={onBack}>
            ← back to our garden
          </button>
          <div style={styles.messageActionGroup}>
            {!done && (
              <button type="button" style={styles.secondaryButton} onClick={revealAll}>
                show all
              </button>
            )}
            {done && (
              <button type="button" style={styles.secondaryButton} onClick={onReplay}>
                replay
              </button>
            )}
          </div>
        </div>

        <div style={styles.messageCard}>
          <div style={styles.messageMetaRow}>
            <p style={styles.messageSectionLabel}>a little letter for you</p>
            {!done && <p style={styles.messageTapHint}>Let it unfold slowly... or tap “show all” if you can&apos;t wait ♥</p>}
          </div>

          {messageBlocks.slice(0, visibleBlocks + 1).map((block, i) => {
            const isVisible = i <= visibleBlocks;
            const isTyping = i === visibleBlocks && typedWords[i] !== undefined && !done;

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
              return (
                <div key={i} style={{ ...styles.giftSection, animation: 'fadeUp 0.6s ease-out both' }}>
                  <p style={styles.giftPrompt}>One more little thing...</p>
                  <p style={styles.giftSubtext}>
                    If there&apos;s anything that would make you smile right now — tiny, simple, silly, anything — I want to hear it from you.
                  </p>
                  <div style={styles.giftOptionGrid}>
                    {wishOptions.map((option) => (
                      <a
                        key={option.label}
                        href={buildWhatsAppLink(option.message)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.giftOptionChip}
                      >
                        {option.label}
                      </a>
                    ))}
                  </div>
                  <p style={styles.giftHint}>Or send your own little wish instead.</p>
                  <a
                    href={buildWhatsAppLink('Hey you ♥ I was thinking about what would make me smile right now...')}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.waButton}
                  >
                    tell me what would make you smile
                  </a>
                  <p style={styles.giftFooter}>Even the smallest thing you mention, I&apos;ll remember.</p>
                </div>
              );
            }
            return null;
          })}
          <div ref={bottomRef} />
        </div>
      </div>

      {done && <MusicPlayer playlist={playlist} startIndex={0} loop={true} promptText="Tap to play our song" />}

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes revealIn { 0% { transform: scale(0.96); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </div>
  );
};

const ThirdMonthversary = () => {
  const history = useHistory();
  const [stage, setStage] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const [now, setNow] = useState(new Date());

  const isLocked = now < UNLOCK_DATE;
  const currentStageCopy = stageCopy[stage] || stageCopy[stageCopy.length - 1];

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
      setSparkles(createSparkles());
      setShowSparkle(true);
      setTimeout(() => {
        setStage(5);
        setTransitioning(false);
        setShowSparkle(false);
        setSparkles([]);
      }, 800);
    } else {
      setTimeout(() => {
        setStage((prev) => prev + 1);
        setTransitioning(false);
      }, 600);
    }
  };

  const handleGiftKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTap();
    }
  };

  const handleReplay = () => {
    setStage(0);
    setTransitioning(false);
    setShowSparkle(false);
    setSparkles([]);
  };

  const handleBack = () => history.push('/mimi/monthversary');

  // ── COUNTDOWN ──
  if (isLocked) {
    const days = Math.max(0, Math.floor((UNLOCK_DATE - now) / (1000 * 60 * 60 * 24)));
    const hours = Math.max(0, Math.floor(((UNLOCK_DATE - now) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const minutes = Math.max(0, Math.floor(((UNLOCK_DATE - now) % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = Math.max(0, Math.floor(((UNLOCK_DATE - now) % (1000 * 60)) / 1000));

    return (
      <div style={styles.page}>
        <div style={styles.countdownShell}>
          <div style={styles.topActionRow}>
            <button type="button" style={styles.secondaryButton} onClick={handleBack}>
              ← back to our garden
            </button>
          </div>
          <div style={styles.countdownWrapper}>
            <p style={styles.countdownLabel}>3rd monthversary</p>
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
        </div>
        <style>{`
          @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    );
  }

  // ── REVEALED MESSAGE (typewriter) ──
  if (stage === 5) {
    return <TypewriterMessage playlist={playlist} onReplay={handleReplay} onBack={handleBack} />;
  }

  // ── GIFT UNWRAP ──
  return (
    <div style={styles.page}>
      <div style={styles.giftWrapper}>
        <div style={styles.topActionRow}>
          <button type="button" style={styles.secondaryButton} onClick={handleBack}>
            ← back to our garden
          </button>
          <span style={styles.giftStepBadge}>step {stage + 1} of 5</span>
        </div>

        <p style={styles.giftTopLabel}>3rd monthversary</p>
        <p style={styles.giftLead}>A small gift for you. Open it slowly — that&apos;s part of the charm.</p>

        <div
          style={styles.giftContainer}
          onClick={handleTap}
          onKeyDown={handleGiftKeyDown}
          role="button"
          tabIndex={0}
          aria-label={currentStageCopy.prompt}
        >
          <div style={styles.giftShadow} />

          {showSparkle && (
            <div style={styles.sparkleContainer}>
              {sparkles.map((sparkle) => (
                <div
                  key={sparkle.id}
                  style={{
                    ...styles.sparkle,
                    '--tx': sparkle.tx,
                    '--ty': sparkle.ty,
                    animationDelay: sparkle.delay,
                  }}
                />
              ))}
            </div>
          )}

          <div style={{
            ...styles.boxBody,
            ...(transitioning ? styles.boxBodyShake : {}),
          }}>
            <div style={styles.boxBase} />
            <div style={styles.boxBaseHighlight} />

            <div style={{
              ...styles.ribbonVertical,
              opacity: stage < 2 ? 1 : 0,
              transform: stage >= 2 ? 'scaleX(0)' : 'scaleX(1)',
            }} />

            <div style={{
              ...styles.ribbonHorizontal,
              opacity: stage < 2 ? 1 : 0,
              transform: stage >= 2 ? 'scaleY(0)' : 'scaleY(1)',
            }} />

            <div style={{
              ...styles.ribbonBow,
              opacity: stage < 2 ? 1 : 0,
              transform: stage >= 2 ? 'scale(0) rotate(180deg)' : 'scale(1) rotate(0deg)',
            }}>
              <div style={styles.bowLeft} />
              <div style={styles.bowRight} />
              <div style={styles.bowCenter} />
            </div>

            <div style={{
              ...styles.wrappingPaper,
              opacity: stage === 0 ? 1 : 0,
              transform: stage === 0 ? 'scale(1)' : 'scale(1.1)',
            }} />

            <div style={{
              ...styles.boxLid,
              opacity: stage < 3 ? 1 : 0,
              transform: stage < 3 ? 'translateY(0) rotateX(0deg)' : 'translateY(-60px) rotateX(-45deg)',
              transformOrigin: 'top center',
            }}>
              <div style={styles.lidRibbon} />
            </div>

            <div style={{
              ...styles.tissuePaper,
              opacity: stage === 3 ? 1 : 0,
              transform: stage === 3 ? 'translateY(0)' : 'translateY(-30px)',
            }}>
              <div style={styles.tissueFold1} />
              <div style={styles.tissueFold2} />
              <div style={styles.tissueFold3} />
            </div>

            <div style={{
              ...styles.insideGlow,
              opacity: stage === 4 ? 1 : 0,
            }} />
          </div>

          <p style={{
            ...styles.tapPrompt,
            opacity: transitioning ? 0 : 1,
          }}>
            {currentStageCopy.prompt}
          </p>

          {!transitioning && (
            <p style={styles.teaseText}>{currentStageCopy.tease}</p>
          )}
        </div>

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
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
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
    width: '100%',
    background: '#0a0a0a',
    backgroundImage: `
      radial-gradient(ellipse at 30% 30%, rgba(183,28,28,0.08) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 70%, rgba(183,28,28,0.05) 0%, transparent 50%)
    `,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 'calc(22px + env(safe-area-inset-top)) 14px calc(24px + env(safe-area-inset-bottom))',
    boxSizing: 'border-box',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  topActionRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  messageActionGroup: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  secondaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '10px 14px',
    background: 'rgba(255,255,255,0.04)',
    color: 'rgba(255,255,255,0.72)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '999px',
    fontFamily: "'Lora', Georgia, serif",
    fontSize: '13px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    backdropFilter: 'blur(8px)',
  },

  /* Countdown */
  countdownShell: {
    width: '100%',
    maxWidth: '560px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
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
  countdownTimer: { display: 'flex', gap: '20px', marginBottom: '32px', flexWrap: 'wrap', justifyContent: 'center' },
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
    width: '100%',
    maxWidth: '560px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    animation: 'fadeUp 0.8s ease-out both',
  },
  giftTopLabel: {
    fontFamily: "'Caveat', cursive",
    fontSize: '20px',
    color: 'rgba(255,255,255,0.4)',
    margin: 0,
    letterSpacing: '0.5px',
  },
  giftLead: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.42)',
    margin: '-10px 0 4px 0',
    textAlign: 'center',
    maxWidth: '420px',
    lineHeight: 1.7,
    fontStyle: 'italic',
  },
  giftStepBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 12px',
    borderRadius: '999px',
    fontSize: '11px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.55)',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  giftContainer: {
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    animation: 'giftFloat 3s ease-in-out infinite',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    outline: 'none',
  },
  giftShadow: {
    position: 'absolute',
    bottom: '56px',
    width: '180px',
    height: '28px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.12) 55%, transparent 100%)',
    filter: 'blur(4px)',
    zIndex: 0,
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
  boxBaseHighlight: {
    position: 'absolute',
    inset: '6px 10px auto 10px',
    height: '34px',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%)',
    borderRadius: '12px',
    pointerEvents: 'none',
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
    maxWidth: '560px',
    animation: 'revealIn 0.7s ease-out both',
    paddingBottom: '80px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  messageCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px',
    padding: '32px 28px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
  },
  messageMetaRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '14px',
  },
  messageSectionLabel: {
    margin: 0,
    fontSize: '11px',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: '0.09em',
    textTransform: 'uppercase',
  },
  messageTapHint: {
    margin: 0,
    fontFamily: "'Caveat', cursive",
    fontSize: '17px',
    color: 'rgba(255,255,255,0.34)',
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
  giftOptionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '10px',
    width: '100%',
    margin: '10px 0 14px',
  },
  giftOptionChip: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    minHeight: '44px',
    padding: '10px 12px',
    borderRadius: '14px',
    color: 'rgba(255,255,255,0.82)',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    textDecoration: 'none',
    fontSize: '13px',
    lineHeight: 1.45,
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

export default ThirdMonthversary;
