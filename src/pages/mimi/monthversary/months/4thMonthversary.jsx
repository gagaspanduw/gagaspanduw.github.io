import React, { useState, useEffect, useRef } from 'react';
import MusicPlayer from '../MusicPlayer';

const UNLOCK_DATE = new Date('2026-06-26T00:00:00');
const JAR_UNLOCK_EVENT = 'monthversary-jar-unlock';

const playlist = [
    { title: 'ILYSB', artist: 'LANY', src: 'https://archive.org/download/LANYILYSBlyricVideo/LANY%20-%20ILYSB%20%28lyric%20video%29.mp3' },
];

const notes = [
  { text: 'Remember when we first started talking and i as a bacon? I never thought it would lead to this.', color: '#FFD54F' },
  { text: 'You always making ordinary days feel special for me.', color: '#FF8A65' },
  { text: 'Even when we argue, I am still happy it is with you.', color: '#AED581' },
  { text: 'I love how you remember the little things about me.', color: '#4FC3F7' },
  { text: 'You are my favorite notification.', color: '#F06292' },
  { text: 'Talking with you always makes my day better.', color: '#BA68C8' },
  { text: 'Thank you for being patient with me. I know I am not always easy.', color: '#4DB6AC' },
  { text: 'Four months. And I would choose you again for the next four thousands.', color: '#FFD54F' },
];

const FourthMonthversary = () => {
  const [now, setNow] = useState(new Date());
  const [pulledNotes, setPulledNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [showFinal, setShowFinal] = useState(false);
  const [jarShake, setJarShake] = useState(false);
  const [noteAnimating, setNoteAnimating] = useState(false);
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

  const handlePullNote = () => {
    if (currentNote !== null || showFinal || noteAnimating) return;

    if (!musicUnlocked.current) {
      musicUnlocked.current = true;
      window.dispatchEvent(new Event(JAR_UNLOCK_EVENT));
    }

    const remaining = notes
      .map((_, i) => i)
      .filter((i) => !pulledNotes.includes(i));

    if (remaining.length === 0) {
      setShowFinal(true);
      return;
    }

    setJarShake(true);
    setTimeout(() => setJarShake(false), 400);

    const nextIndex = remaining[Math.floor(Math.random() * remaining.length)];
    setNoteAnimating(true);
    setTimeout(() => {
      setCurrentNote(nextIndex);
      setNoteAnimating(false);
    }, 300);
  };

  const handleCloseNote = () => {
    setPulledNotes([...pulledNotes, currentNote]);
    setCurrentNote(null);

    if (pulledNotes.length + 1 === notes.length) {
      setTimeout(() => setShowFinal(true), 600);
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
          <p style={styles.countdownLabel}>4th monthversary</p>
          <h1 style={styles.countdownTitle}>Not yet</h1>
          <p style={styles.countdownSub}>Come back on June 26</p>
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
          <p style={styles.countdownHint}>Something is waiting for you in the jar.</p>
        </div>
        <style>{`
          @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    );
  }

  const notesLeft = notes.length - pulledNotes.length;

  return (
    <div style={styles.page}>
      {/* ── JAR SCENE ── */}
      {!showFinal && (
        <div style={styles.jarScene}>
          <p style={styles.topLabel}>4th monthversary</p>
          <h1 style={styles.sceneTitle}>A jar of notes for you</h1>
          <p style={styles.sceneSubtitle}>
            {notesLeft > 0
              ? `${notesLeft} note${notesLeft === 1 ? '' : 's'} left in the jar. Tap to pull one out.`
              : 'You have read all the notes. Tap the jar one more time.'}
          </p>

          {/* The jar */}
          <div
            style={{
              ...styles.jarContainer,
              ...(jarShake ? styles.jarShake : {}),
            }}
            onClick={handlePullNote}
          >
            {/* Jar lid */}
            <div style={styles.jarLid}>
              <div style={styles.jarLidTop} />
            </div>

            {/* Jar neck */}
            <div style={styles.jarNeck} />

            {/* Jar body */}
            <div style={styles.jarBody}>
              {/* Glass shine */}
              <div style={styles.jarShineLeft} />
              <div style={styles.jarShineRight} />

              {/* Notes inside */}
              {notes.map((note, i) => {
                if (pulledNotes.includes(i)) return null;
                return (
                  <div
                    key={i}
                    style={{
                      ...styles.noteInside,
                      backgroundColor: note.color,
                      left: `${12 + (i * 11) % 70}%`,
                      top: `${18 + (i * 17) % 55}%`,
                      transform: `rotate(${(i * 37) % 60 - 30}deg)`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                );
              })}

              {/* Glow at bottom */}
              <div style={styles.jarGlow} />
            </div>

            {/* Tap hint */}
            {currentNote === null && !noteAnimating && (
              <p style={styles.tapHint}>
                {notesLeft > 0 ? 'Tap the jar' : 'Tap for your last note'}
              </p>
            )}
          </div>

          {/* Progress dots */}
          <div style={styles.progressDots}>
            {notes.map((_, i) => (
              <div
                key={i}
                style={{
                  ...styles.dot,
                  ...(pulledNotes.includes(i) ? styles.dotRead : {}),
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── FINAL MESSAGE ── */}
      {showFinal && (
        <div style={styles.finalWrapper}>
          <p style={styles.finalBadge}>4 months of us</p>
          <h1 style={styles.finalTitle}>Happy 4th Monthversary</h1>

          <div style={styles.finalCard}>
            <p style={styles.finalPara}>
              That is all the notes from the jar. Every single one is true.
            </p>
            <p style={styles.finalPara}>
              Four months. We have laughed, we have fought, we have made up, and we have grown. I don't have it all figured out, but I know I want to figure it out with you.
            </p>
            <p style={styles.finalHighlight}>
              You are not just someone I love. You are someone I choose, every day, even when it is hard. Especially when it is hard.
            </p>
            <p style={styles.finalPara}>
              Here is to many more months, many more notes, and many more reasons to smile because of you.
            </p>
            <div style={styles.finalSignature}>
              <p style={styles.finalSigLine}>Yours, always</p>
              <p style={styles.finalSigName}>— Gagas</p>
            </div>
          </div>
        </div>
      )}

      {/* Note overlay */}
      {currentNote !== null && (
        <div style={styles.noteOverlay} onClick={handleCloseNote}>
          <div
            style={{
              ...styles.noteCard,
              backgroundColor: notes[currentNote].color,
            }}
          >
            <div style={styles.noteFoldLine} />
            <div style={styles.noteInner}>
              <p style={styles.noteText}>{notes[currentNote].text}</p>
            </div>
            <p style={styles.noteTapClose}>Tap to fold it back</p>
          </div>
        </div>
      )}

      {/* ── Persistent music player (survives jar → final transition) ── */}
      <MusicPlayer
        playlist={playlist}
        loop={true}
        autoplayOnMount={false}
        unlockEventName={JAR_UNLOCK_EVENT}
        showPromptUi={false}
      />

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes jarShake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
        @keyframes noteAppear { from { opacity: 0; transform: scale(0.5) translateY(40px) rotate(-5deg); } to { opacity: 1; transform: scale(1) translateY(0) rotate(0deg); } }
        @keyframes floatGlow { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes tapPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.7; } }
        @keyframes glowPulse { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.1); } }
      `}</style>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0a0a0a',
    backgroundImage: `
      radial-gradient(ellipse at 30% 20%, rgba(255,193,7,0.06) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 80%, rgba(255,152,0,0.04) 0%, transparent 50%)
    `,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Lora', Georgia, serif",
    boxSizing: 'border-box',
    padding: '24px 16px',
  },

  // ── Countdown ──
  countdownWrapper: {
    textAlign: 'center',
    animation: 'fadeUp 0.8s ease-out both',
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
    color: '#FFD54F',
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
    color: '#FFD54F',
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
    color: 'rgba(255,213,79,0.4)',
  },

  // ── Jar scene ──
  jarScene: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    animation: 'fadeUp 0.8s ease-out both',
    maxWidth: '400px',
    width: '100%',
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
    color: '#FFD54F',
    margin: '0 0 6px 0',
    fontWeight: 600,
    textAlign: 'center',
  },
  sceneSubtitle: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.35)',
    margin: '0 0 32px 0',
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // ── Jar ──
  jarContainer: {
    position: 'relative',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    userSelect: 'none',
  },
  jarShake: {
    animation: 'jarShake 0.4s ease-in-out',
  },
  jarLid: {
    width: '150px',
    height: '22px',
    background: 'linear-gradient(180deg, #8D6E63 0%, #6D4C41 30%, #5D4037 60%, #4E342E 100%)',
    borderRadius: '6px 6px 3px 3px',
    boxShadow: '0 3px 10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.3)',
    zIndex: 3,
    position: 'relative',
  },
  jarLidTop: {
    position: 'absolute',
    top: '-4px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '120px',
    height: '6px',
    background: 'linear-gradient(180deg, #8D6E63 0%, #6D4C41 100%)',
    borderRadius: '3px 3px 0 0',
    boxShadow: '0 -1px 3px rgba(0,0,0,0.3)',
  },
  jarNeck: {
    width: '140px',
    height: '12px',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.04) 100%)',
    borderLeft: '2px solid rgba(255,255,255,0.1)',
    borderRight: '2px solid rgba(255,255,255,0.1)',
    zIndex: 2,
  },
  jarBody: {
    width: '190px',
    height: '270px',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0.04) 100%)',
    borderRadius: '8px 8px 24px 24px',
    border: '2px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(3px)',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 12px 40px rgba(0,0,0,0.5), inset 0 -15px 30px rgba(0,0,0,0.2), inset 0 5px 15px rgba(255,255,255,0.05)',
  },
  jarShineLeft: {
    position: 'absolute',
    top: '15px',
    left: '12px',
    width: '24px',
    height: '85%',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.02) 70%, transparent 100%)',
    borderRadius: '12px',
    filter: 'blur(3px)',
  },
  jarShineRight: {
    position: 'absolute',
    top: '15px',
    right: '18px',
    width: '8px',
    height: '60%',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)',
    borderRadius: '4px',
    filter: 'blur(2px)',
  },
  jarGlow: {
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '140px',
    height: '60px',
    background: 'radial-gradient(ellipse, rgba(255,193,7,0.15) 0%, transparent 70%)',
    animation: 'glowPulse 3s ease-in-out infinite',
  },
  noteInside: {
    position: 'absolute',
    width: '42px',
    height: '30px',
    borderRadius: '3px',
    opacity: 0.75,
    animation: 'floatGlow 2s ease-in-out infinite',
    boxShadow: '0 0 10px currentColor, 0 1px 3px rgba(0,0,0,0.2)',
  },
  tapHint: {
    fontFamily: "'Caveat', cursive",
    fontSize: '18px',
    color: 'rgba(255,255,255,0.4)',
    marginTop: '24px',
    animation: 'tapPulse 2s ease-in-out infinite',
  },

  // ── Progress ──
  progressDots: {
    display: 'flex',
    gap: '8px',
    marginTop: '28px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.1)',
    transition: 'all 0.4s ease',
  },
  dotRead: {
    background: '#FFD54F',
    boxShadow: '0 0 8px rgba(255,213,79,0.6)',
    transform: 'scale(1.2)',
  },

  // ── Note overlay ──
  noteOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.88)',
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
    padding: '0',
    borderRadius: '4px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 60px rgba(255,255,255,0.08)',
    animation: 'noteAppear 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both',
    position: 'relative',
    overflow: 'hidden',
  },
  noteFoldLine: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    height: '3px',
    background: 'rgba(0,0,0,0.15)',
  },
  noteInner: {
    padding: '40px 28px 20px',
  },
  noteText: {
    fontFamily: "'Caveat', cursive",
    fontSize: '26px',
    color: 'rgba(0,0,0,0.78)',
    lineHeight: 1.5,
    margin: 0,
    textAlign: 'center',
  },
  noteTapClose: {
    fontSize: '11px',
    color: 'rgba(0,0,0,0.25)',
    padding: '0 28px 24px',
    textAlign: 'center',
    fontStyle: 'italic',
    margin: 0,
  },

  // ── Final message ──
  finalWrapper: {
    maxWidth: '520px',
    width: '100%',
    animation: 'fadeUp 0.8s ease-out both',
  },
  finalBadge: {
    fontFamily: "'Caveat', cursive",
    fontSize: '20px',
    color: 'rgba(255,213,79,0.5)',
    textAlign: 'center',
    margin: '0 0 6px 0',
  },
  finalTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(28px, 7vw, 40px)',
    color: '#FFD54F',
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
    color: '#FFD54F',
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
};

export default FourthMonthversary;
