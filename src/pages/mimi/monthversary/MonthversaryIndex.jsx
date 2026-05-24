import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const months = [
  {
    number: 4,
    route: '/mimi/monthversary/4',
    title: '4th Monthversary',
    date: 'May 26, 2026',
    hint: 'Tap to unwrap',
    emoji: '🍎',
    unlockDate: new Date('2026-05-26T00:00:00'),
    // Position as percentage within the tree canopy area
    cx: 50,
    cy: 30,
  },
  // Future months — positioned throughout the canopy
  // { number: 5, route: '/mimi/monthversary/5', title: '5th Monthversary', date: 'June 26, 2026', hint: '...', emoji: '🍊', unlockDate: new Date('2026-06-26T00:00:00'), cx: 32, cy: 24 },
  // { number: 6, route: '/mimi/monthversary/6', title: '6th Monthversary', date: 'July 26, 2026', hint: '...', emoji: '🍋', unlockDate: new Date('2026-07-26T00:00:00'), cx: 68, cy: 26 },
  // { number: 7, route: '/mimi/monthversary/7', title: '7th Monthversary', date: 'August 26, 2026', hint: '...', emoji: '🍑', unlockDate: new Date('2026-08-26T00:00:00'), cx: 40, cy: 16 },
  // { number: 8, route: '/mimi/monthversary/8', title: '8th Monthversary', date: 'September 26, 2026', hint: '...', emoji: '🍇', unlockDate: new Date('2026-09-26T00:00:00'), cx: 60, cy: 18 },
];

// Firefly positions (random-ish, deterministic)
const fireflies = [
  { x: 15, y: 20, delay: 0, dur: 6 },
  { x: 82, y: 35, delay: 1.2, dur: 7 },
  { x: 25, y: 55, delay: 2.5, dur: 5 },
  { x: 70, y: 15, delay: 0.8, dur: 8 },
  { x: 45, y: 70, delay: 3.1, dur: 6 },
  { x: 90, y: 60, delay: 1.7, dur: 7 },
  { x: 10, y: 75, delay: 4.0, dur: 5.5 },
  { x: 55, y: 10, delay: 2.2, dur: 6.5 },
  { x: 35, y: 85, delay: 0.5, dur: 7.5 },
  { x: 78, y: 78, delay: 3.5, dur: 6 },
  { x: 60, y: 50, delay: 1.0, dur: 8 },
  { x: 20, y: 40, delay: 2.8, dur: 5 },
];

const stars = Array.from({ length: 40 }, (_, i) => ({
  x: (i * 37 + 13) % 100,
  y: (i * 23 + 7) % 50,
  size: 0.5 + (i % 3) * 0.5,
  delay: (i * 0.3) % 4,
}));

const MonthversaryIndex = () => {
  const history = useHistory();
  const [hoveredMonth, setHoveredMonth] = useState(null);
  const [now, setNow] = useState(new Date());
  const [selectedLocked, setSelectedLocked] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (timeLeft) => {
    if (timeLeft <= 0) return null;
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    return `${minutes}m ${seconds}s`;
  };

  const handleFruitClick = (month) => {
    const isUnlocked = !month.unlockDate || now >= month.unlockDate;
    if (isUnlocked) {
      history.push(month.route);
    } else {
      setSelectedLocked(month.number);
      setTimeout(() => setSelectedLocked(null), 3000);
    }
  };

  // SVG tree component rendered inline
  const treeSvg = (
    <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" style={styles.treeSvg}>
      <defs>
        {/* Trunk gradient */}
        <linearGradient id="trunkGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3E2723" />
          <stop offset="40%" stopColor="#5D4037" />
          <stop offset="70%" stopColor="#4E342E" />
          <stop offset="100%" stopColor="#3E2723" />
        </linearGradient>

        {/* Leaf gradients */}
        <radialGradient id="leafGrad1" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#4CAF50" />
          <stop offset="60%" stopColor="#2E7D32" />
          <stop offset="100%" stopColor="#1B5E20" />
        </radialGradient>
        <radialGradient id="leafGrad2" cx="50%" cy="30%">
          <stop offset="0%" stopColor="#66BB6A" />
          <stop offset="50%" stopColor="#43A047" />
          <stop offset="100%" stopColor="#2E7D32" />
        </radialGradient>
        <radialGradient id="leafGrad3" cx="60%" cy="40%">
          <stop offset="0%" stopColor="#81C784" />
          <stop offset="50%" stopColor="#4CAF50" />
          <stop offset="100%" stopColor="#388E3C" />
        </radialGradient>

        {/* Fruit glow */}
        <radialGradient id="fruitGlow">
          <stop offset="0%" stopColor="rgba(255,200,50,0.5)" />
          <stop offset="100%" stopColor="rgba(255,200,50,0)" />
        </radialGradient>

        {/* Firefly glow */}
        <radialGradient id="fireflyGlow">
          <stop offset="0%" stopColor="rgba(255,255,150,0.9)" />
          <stop offset="40%" stopColor="rgba(255,255,100,0.4)" />
          <stop offset="100%" stopColor="rgba(255,255,100,0)" />
        </radialGradient>

        {/* Ground gradient */}
        <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B5E20" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0a0f0a" stopOpacity="0" />
        </linearGradient>

        {/* Leaf shadow filter */}
        <filter id="leafShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.3" />
        </filter>

        {/* Glow filter for fruits */}
        <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Stars */}
      {stars.map((s, i) => (
        <circle
          key={`star-${i}`}
          cx={s.x * 4}
          cy={s.y * 5}
          r={s.size}
          fill="white"
          opacity={0.4 + (i % 3) * 0.2}
          className="star-twinkle"
          style={{ animationDelay: `${s.delay}s` }}
        />
      ))}

      {/* Ground */}
      <ellipse cx="200" cy="470" rx="180" ry="30" fill="url(#groundGrad)" />

      {/* Trunk — organic curved shape */}
      <path
        d="M185 470 C183 440, 178 400, 180 360 C182 320, 175 290, 178 260 C180 240, 182 230, 185 220 L195 220 C192 225, 190 230, 188 240 C186 260, 190 290, 188 320 C186 350, 192 400, 195 440 C196 455, 198 465, 200 470 Z"
        fill="url(#trunkGrad)"
      />
      {/* Trunk right side */}
      <path
        d="M200 470 C202 465, 204 455, 205 440 C208 400, 214 350, 212 320 C210 290, 214 260, 212 240 C210 230, 208 225, 205 220 L215 220 C218 230, 220 240, 222 260 C225 290, 218 320, 220 360 C222 400, 217 440, 215 470 Z"
        fill="url(#trunkGrad)"
      />

      {/* Bark texture lines */}
      <path d="M190 460 C189 440, 186 420, 188 400" stroke="#2E1B0E" strokeWidth="0.5" fill="none" opacity="0.4" />
      <path d="M195 450 C194 430, 192 400, 193 370" stroke="#2E1B0E" strokeWidth="0.5" fill="none" opacity="0.3" />
      <path d="M205 455 C206 435, 208 410, 207 380" stroke="#2E1B0E" strokeWidth="0.5" fill="none" opacity="0.4" />
      <path d="M210 445 C211 420, 213 390, 211 360" stroke="#2E1B0E" strokeWidth="0.5" fill="none" opacity="0.3" />

      {/* Branches */}
      <path d="M188 280 C170 265, 145 255, 125 250" stroke="#5D4037" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M212 280 C230 265, 255 255, 275 250" stroke="#5D4037" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M185 250 C165 235, 140 220, 120 210" stroke="#5D4037" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M215 250 C235 235, 260 220, 280 210" stroke="#5D4037" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M190 235 C180 215, 165 195, 155 180" stroke="#5D4037" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M210 235 C220 215, 235 195, 245 180" stroke="#5D4037" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M195 225 C190 200, 185 175, 190 155" stroke="#5D4037" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M205 225 C210 200, 215 175, 210 155" stroke="#5D4037" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Canopy — layered leaf clusters */}
      <g filter="url(#leafShadow)" className="tree-sway">
        {/* Back layer (darkest, largest) */}
        <ellipse cx="140" cy="220" rx="55" ry="45" fill="url(#leafGrad1)" opacity="0.8" />
        <ellipse cx="260" cy="220" rx="55" ry="45" fill="url(#leafGrad1)" opacity="0.8" />
        <ellipse cx="200" cy="170" rx="65" ry="55" fill="url(#leafGrad1)" opacity="0.85" />
        <ellipse cx="130" cy="180" rx="45" ry="40" fill="url(#leafGrad1)" opacity="0.7" />
        <ellipse cx="270" cy="180" rx="45" ry="40" fill="url(#leafGrad1)" opacity="0.7" />

        {/* Middle layer */}
        <ellipse cx="165" cy="195" rx="50" ry="42" fill="url(#leafGrad2)" opacity="0.85" />
        <ellipse cx="235" cy="195" rx="50" ry="42" fill="url(#leafGrad2)" opacity="0.85" />
        <ellipse cx="200" cy="150" rx="55" ry="48" fill="url(#leafGrad2)" opacity="0.9" />
        <ellipse cx="150" cy="160" rx="40" ry="35" fill="url(#leafGrad2)" opacity="0.75" />
        <ellipse cx="250" cy="160" rx="40" ry="35" fill="url(#leafGrad2)" opacity="0.75" />
        <ellipse cx="120" cy="210" rx="35" ry="30" fill="url(#leafGrad2)" opacity="0.7" />
        <ellipse cx="280" cy="210" rx="35" ry="30" fill="url(#leafGrad2)" opacity="0.7" />

        {/* Front layer (brightest, smallest) */}
        <ellipse cx="180" cy="175" rx="40" ry="35" fill="url(#leafGrad3)" opacity="0.8" />
        <ellipse cx="220" cy="175" rx="40" ry="35" fill="url(#leafGrad3)" opacity="0.8" />
        <ellipse cx="200" cy="135" rx="42" ry="38" fill="url(#leafGrad3)" opacity="0.85" />
        <ellipse cx="155" cy="195" rx="30" ry="28" fill="url(#leafGrad3)" opacity="0.7" />
        <ellipse cx="245" cy="195" rx="30" ry="28" fill="url(#leafGrad3)" opacity="0.7" />
        <ellipse cx="200" cy="200" rx="35" ry="28" fill="url(#leafGrad3)" opacity="0.75" />

        {/* Top accent clusters */}
        <ellipse cx="190" cy="115" rx="28" ry="25" fill="url(#leafGrad3)" opacity="0.8" />
        <ellipse cx="210" cy="115" rx="28" ry="25" fill="url(#leafGrad3)" opacity="0.8" />
        <ellipse cx="200" cy="105" rx="22" ry="20" fill="url(#leafGrad2)" opacity="0.85" />

        {/* Leaf texture dots */}
        {[
          [160, 165], [175, 145], [200, 125], [225, 145], [240, 165],
          [145, 200], [255, 200], [185, 190], [215, 190], [200, 160],
          [170, 180], [230, 180], [195, 140], [205, 140], [180, 210],
          [220, 210], [150, 175], [250, 175], [200, 110], [190, 125],
        ].map(([x, y], i) => (
          <circle key={`dot-${i}`} cx={x} cy={y} r={2 + (i % 3)} fill="#1B5E20" opacity={0.15 + (i % 4) * 0.05} />
        ))}
      </g>

      {/* Fruits */}
      {months.map((month) => {
        const isUnlocked = !month.unlockDate || now >= month.unlockDate;
        // Map percentage to SVG coordinates within canopy area
        const fx = 100 + (month.cx / 100) * 200; // 100-300 x range
        const fy = 90 + (month.cy / 100) * 150;  // 90-240 y range
        const isHovered = hoveredMonth === month.number;

        return (
          <g
            key={month.number}
            onClick={() => handleFruitClick(month)}
            onMouseEnter={() => setHoveredMonth(month.number)}
            onMouseLeave={() => setHoveredMonth(null)}
            style={{ cursor: isUnlocked ? 'pointer' : 'default' }}
            className={isUnlocked ? 'fruit-float' : ''}
          >
            {/* Glow behind fruit */}
            {isUnlocked && (
              <circle cx={fx} cy={fy} r="20" fill="url(#fruitGlow)" className="glow-pulse" />
            )}
            {/* Fruit body */}
            <circle
              cx={fx}
              cy={fy}
              r={isHovered && isUnlocked ? 12 : 10}
              fill={isUnlocked ? 'rgba(255,255,255,0.15)' : 'rgba(100,100,100,0.3)'}
              stroke={isUnlocked ? 'rgba(255,255,255,0.3)' : 'rgba(100,100,100,0.3)'}
              strokeWidth="1.5"
              style={{ transition: 'all 0.3s ease' }}
              filter={isUnlocked ? 'url(#glowFilter)' : undefined}
            />
            {/* Emoji */}
            <text
              x={fx}
              y={fy + 1}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={isHovered && isUnlocked ? '14' : '12'}
              style={{ transition: 'font-size 0.3s ease', userSelect: 'none' }}
            >
              {isUnlocked ? month.emoji : '🌱'}
            </text>
            {/* Stem */}
            <line
              x1={fx}
              y1={fy - 10}
              x2={fx + 3}
              y2={fy - 16}
              stroke="#5D4037"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        );
      })}

      {/* Fireflies */}
      {fireflies.map((f, i) => (
        <circle
          key={`ff-${i}`}
          cx={f.x * 4}
          cy={f.y * 5}
          r="3"
          fill="url(#fireflyGlow)"
          className="firefly"
          style={{ animationDelay: `${f.delay}s`, animationDuration: `${f.dur}s` }}
        />
      ))}

      {/* Grass blades at base */}
      {[140, 155, 170, 185, 215, 230, 245, 260].map((x, i) => (
        <path
          key={`grass-${i}`}
          d={`M${x} 470 C${x + (i % 2 ? 3 : -3)} 458, ${x + (i % 2 ? 5 : -5)} 452, ${x + (i % 2 ? 2 : -2)} 445`}
          stroke="#2E7D32"
          strokeWidth="1.5"
          fill="none"
          opacity={0.3 + (i % 3) * 0.1}
          className="grass-sway"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
    </svg>
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <p style={styles.topLabel}>Our little garden</p>
          <h1 style={styles.title}>Monthversary</h1>
          <p style={styles.subtitle}>
            Each month, our tree grows a new fruit. Tap one to see what's inside.
          </p>
        </div>

        {/* SVG Tree */}
        <div style={styles.treeSection}>
          {treeSvg}
        </div>

        {/* Tooltip for hovered fruit */}
        {hoveredMonth && (() => {
          const month = months.find(m => m.number === hoveredMonth);
          if (!month) return null;
          const isUnlocked = !month.unlockDate || now >= month.unlockDate;
          const timeLeft = month.unlockDate ? month.unlockDate - now : 0;
          return (
            <div style={styles.tooltipBar}>
              <span style={styles.tooltipEmoji}>{isUnlocked ? month.emoji : '🌱'}</span>
              <span style={styles.tooltipTitle}>{month.title}</span>
              {isUnlocked ? (
                <span style={styles.tooltipHint}>{month.hint}</span>
              ) : (
                <span style={styles.tooltipCountdown}>{formatCountdown(timeLeft)}</span>
              )}
            </div>
          );
        })()}

        {/* Locked popup */}
        {selectedLocked && (() => {
          const month = months.find(m => m.number === selectedLocked);
          if (!month) return null;
          const timeLeft = month.unlockDate ? month.unlockDate - now : 0;
          return (
            <div style={styles.lockedPopup}>
              <span style={styles.lockedPopupText}>
                🌱 Not yet... {formatCountdown(timeLeft)} to go
              </span>
            </div>
          );
        })()}

        {/* Month info cards */}
        <div style={styles.monthCards}>
          {months.map((month, idx) => {
            const isUnlocked = !month.unlockDate || now >= month.unlockDate;
            const timeLeft = month.unlockDate ? month.unlockDate - now : 0;
            const countdownText = formatCountdown(timeLeft);
            const isHovered = hoveredMonth === month.number;

            return (
              <div
                key={month.number}
                style={{
                  ...styles.monthCard,
                  ...(isHovered && isUnlocked ? styles.monthCardHover : {}),
                  ...(!isUnlocked ? styles.monthCardLocked : {}),
                  animationDelay: `${0.4 + idx * 0.1}s`,
                }}
                onClick={() => handleFruitClick(month)}
                onMouseEnter={() => setHoveredMonth(month.number)}
                onMouseLeave={() => setHoveredMonth(null)}
              >
                <span style={{
                  ...styles.monthEmoji,
                  transform: isHovered && isUnlocked ? 'scale(1.2)' : 'scale(1)',
                }}>
                  {isUnlocked ? month.emoji : '🌱'}
                </span>
                <div style={styles.monthInfo}>
                  <p style={styles.monthTitle}>{month.title}</p>
                  <p style={styles.monthDate}>{month.date}</p>
                  {isUnlocked ? (
                    <p style={styles.monthHint}>{month.hint}</p>
                  ) : (
                    <p style={styles.countdown}>{countdownText}</p>
                  )}
                </div>
                <span style={{ ...styles.arrow, opacity: isUnlocked ? 1 : 0.2 }}>→</span>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <p style={styles.footer}>
          Our tree is still growing. More fruits will bloom soon.
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }

        @keyframes fireflyFloat {
          0%   { opacity: 0; transform: translate(0, 0); }
          15%  { opacity: 0.8; }
          50%  { opacity: 0.4; transform: translate(15px, -20px); }
          85%  { opacity: 0.7; }
          100% { opacity: 0; transform: translate(-10px, -35px); }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.4; r: 18; }
          50%      { opacity: 0.8; r: 22; }
        }

        @keyframes fruitFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-4px); }
        }

        @keyframes treeSway {
          0%, 100% { transform: rotate(0deg); }
          25%      { transform: rotate(0.3deg); }
          75%      { transform: rotate(-0.3deg); }
        }

        @keyframes grassSway {
          0%, 100% { transform: rotate(0deg); }
          50%      { transform: rotate(3deg); }
        }

        .star-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }

        .firefly {
          animation: fireflyFloat 6s ease-in-out infinite;
        }

        .glow-pulse {
          animation: glowPulse 2.5s ease-in-out infinite;
        }

        .fruit-float {
          animation: fruitFloat 3s ease-in-out infinite;
        }

        .tree-sway {
          transform-origin: 200px 300px;
          animation: treeSway 8s ease-in-out infinite;
        }

        .grass-sway {
          transform-origin: bottom;
          animation: grassSway 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #050a05 0%, #0a0f0a 40%, #0d120d 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 14px',
    fontFamily: "'Lora', Georgia, serif",
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  container: {
    width: '100%',
    maxWidth: '600px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '8px',
    animation: 'fadeUp 0.8s ease-out both',
  },
  topLabel: {
    fontFamily: "'Caveat', cursive",
    fontSize: '22px',
    color: 'rgba(255,255,255,0.4)',
    margin: '0 0 6px 0',
  },
  title: {
    fontFamily: "'Lora', Georgia, serif",
    fontSize: 'clamp(36px, 8vw, 52px)',
    color: '#81C784',
    margin: '0 0 8px 0',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    textShadow: '0 2px 20px rgba(76,175,80,0.2)',
  },
  subtitle: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.4)',
    margin: 0,
    lineHeight: '1.6',
    fontStyle: 'italic',
  },

  /* Tree */
  treeSection: {
    animation: 'fadeUp 1s ease-out both',
    animationDelay: '0.2s',
    marginBottom: '8px',
    borderRadius: '20px',
    overflow: 'hidden',
  },
  treeSvg: {
    width: '100%',
    height: 'auto',
    display: 'block',
    filter: 'drop-shadow(0 8px 40px rgba(0,0,0,0.5))',
  },

  /* Tooltip bar */
  tooltipBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '8px 16px',
    background: 'rgba(10,15,10,0.8)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    marginBottom: '12px',
    animation: 'fadeUp 0.2s ease-out both',
    backdropFilter: 'blur(8px)',
  },
  tooltipEmoji: {
    fontSize: '16px',
  },
  tooltipTitle: {
    fontSize: '13px',
    color: '#fff',
    fontWeight: 600,
  },
  tooltipHint: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.5)',
    fontStyle: 'italic',
  },
  tooltipCountdown: {
    fontSize: '12px',
    color: '#81C784',
    fontFamily: "'Caveat', cursive",
    fontWeight: 600,
  },

  /* Locked popup */
  lockedPopup: {
    textAlign: 'center',
    padding: '6px 12px',
    background: 'rgba(10,15,10,0.8)',
    border: '1px solid rgba(129,199,132,0.2)',
    borderRadius: '10px',
    marginBottom: '12px',
    animation: 'fadeUp 0.2s ease-out both',
  },
  lockedPopupText: {
    fontSize: '13px',
    color: '#81C784',
    fontFamily: "'Caveat', cursive",
    fontWeight: 600,
  },

  /* Month cards */
  monthCards: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '24px',
  },
  monthCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '14px',
    padding: '16px 18px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    animation: 'fadeUp 0.6s ease-out both',
  },
  monthCardHover: {
    background: 'rgba(76, 175, 80, 0.08)',
    borderColor: 'rgba(76, 175, 80, 0.2)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 24px rgba(76, 175, 80, 0.1)',
  },
  monthCardLocked: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  monthEmoji: {
    fontSize: '28px',
    flexShrink: 0,
    transition: 'transform 0.3s ease',
    display: 'inline-block',
  },
  monthInfo: {
    flex: 1,
    minWidth: 0,
  },
  monthTitle: {
    fontSize: '16px',
    color: '#fff',
    margin: '0 0 2px 0',
    fontWeight: 600,
  },
  monthDate: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.3)',
    margin: '0 0 4px 0',
  },
  monthHint: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.45)',
    margin: 0,
    fontStyle: 'italic',
  },
  countdown: {
    fontSize: '13px',
    color: '#81C784',
    margin: 0,
    fontFamily: "'Caveat', cursive",
    fontWeight: 600,
  },
  arrow: {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.2)',
    flexShrink: 0,
    transition: 'all 0.3s ease',
  },
  footer: {
    textAlign: 'center',
    fontSize: '14px',
    color: 'rgba(255,255,255,0.3)',
    margin: 0,
    fontStyle: 'italic',
    animation: 'fadeUp 0.8s ease-out both',
    animationDelay: '0.5s',
  },
};

export default MonthversaryIndex;
