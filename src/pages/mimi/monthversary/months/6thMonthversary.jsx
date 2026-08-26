import React, { useState, useEffect, useRef } from 'react';
import MusicPlayer from '../MusicPlayer';

const UNLOCK_DATE = new Date('2026-08-26T00:00:00');
const HERBARIUM_UNLOCK_EVENT = 'monthversary-herbarium-unlock';

const playlist = [
  { title: 'Vow', artist: 'Coldiac', src: '/music/coldiac-vow.mp3' },
];

// Paper noise as inline SVG (data URL) — applied as background overlay
const PAPER_NOISE = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.12 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Per-card visual variation — pre-baked rotation/width, so each card feels hand-pinned
const cardVariations = [
  { rotate: -2.4, width: 252, tagOffset: 14 },
  { rotate: 1.6,  width: 264, tagOffset: 18 },
  { rotate: -0.8, width: 244, tagOffset: 12 },
  { rotate: 2.6,  width: 274, tagOffset: 20 },
  { rotate: -1.4, width: 248, tagOffset: 16 },
  { rotate: 0.9,  width: 258, tagOffset: 14 },
];

// Six pressed specimens — more muted, "actually pressed" colors
const specimens = [
  {
    id: 'sunflower',
    name: 'Sunflower',
    latin: 'Helianthus annuus',
    petal: '#A88420',
    petalDeep: '#7A5F12',
    accent: '#D4B855',
    leaf: '#4A5A30',
    stem: '#34401F',
    text: 'Six months, and you are still the sun my whole garden turns toward.',
    no: 'I',
  },
  {
    id: 'rose',
    name: 'Rose',
    latin: 'Rosa damascena',
    petal: '#8E4458',
    petalDeep: '#5C2A38',
    accent: '#B57689',
    leaf: '#445132',
    stem: '#2D3818',
    text: 'I did not know love could have a color until you.',
    no: 'II',
  },
  {
    id: 'tulip',
    name: 'Tulip',
    latin: 'Tulipa gesneriana',
    petal: '#6E5483',
    petalDeep: '#45335A',
    accent: '#9C82B0',
    leaf: '#475A30',
    stem: '#2F3A1B',
    text: 'I would pick you. Every spring. Every season. Every single time.',
    no: 'III',
  },
  {
    id: 'daisy',
    name: 'Daisy',
    latin: 'Bellis perennis',
    petal: '#D4C088',
    petalDeep: '#9C8855',
    accent: '#E8D9A8',
    leaf: '#4D5A35',
    stem: '#34401F',
    text: 'He loves me, he loves me not — you made me stop counting.',
    no: 'IV',
  },
  {
    id: 'lavender',
    name: 'Lavender',
    latin: 'Lavandula angustifolia',
    petal: '#6B5A7E',
    petalDeep: '#3F3450',
    accent: '#9A8AAC',
    leaf: '#425033',
    stem: '#2A331A',
    text: 'You calm the parts of me I did not know were loud.',
    no: 'V',
  },
  {
    id: 'lily',
    name: 'Lily',
    latin: 'Lilium candidum',
    petal: '#B8895E',
    petalDeep: '#7E5A38',
    accent: '#D6B287',
    leaf: '#4A5A30',
    stem: '#2F3A1B',
    text: 'Soft, steady, and impossible not to fall for.',
    no: 'VI',
  },
];

// Hand-drawn botanical: asymmetric petals, veined leaves, slight watercolor bleed
const BotanicalSVG = ({ specimen, dimmed }) => (
  <svg
    width="124"
    height="168"
    viewBox="0 0 124 168"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      filter: dimmed
        ? 'grayscale(0.7) opacity(0.5)'
        : `drop-shadow(0 1px 2px rgba(40, 25, 10, 0.25))`,
      transition: 'filter 0.5s ease',
    }}
  >
    {/* Hand-wobbled stem (Bezier with slight asymmetry) */}
    <path
      d="M60 165 Q58 132 62 102 Q59 82 61 70"
      stroke={specimen.stem}
      strokeWidth="2.2"
      fill="none"
      strokeLinecap="round"
    />
    {/* Leaves with central vein */}
    <g>
      <ellipse cx="48" cy="118" rx="14" ry="5" fill={specimen.leaf} opacity="0.85" transform="rotate(-30 48 118)" />
      <line x1="35" y1="122" x2="61" y2="114" stroke={specimen.stem} strokeWidth="0.5" opacity="0.7" transform="rotate(-30 48 118)" />
    </g>
    <g>
      <ellipse cx="72" cy="128" rx="14" ry="5" fill={specimen.leaf} opacity="0.85" transform="rotate(35 72 128)" />
      <line x1="59" y1="124" x2="85" y2="132" stroke={specimen.stem} strokeWidth="0.5" opacity="0.7" transform="rotate(35 72 128)" />
    </g>
    <g>
      <ellipse cx="50" cy="96" rx="10" ry="4" fill={specimen.leaf} opacity="0.8" transform="rotate(-25 50 96)" />
      <line x1="41" y1="98" x2="59" y2="94" stroke={specimen.stem} strokeWidth="0.4" opacity="0.6" transform="rotate(-25 50 96)" />
    </g>
    {/* Petals — 6 around center, each with subtle per-petal asymmetry */}
    {[0, 60, 120, 180, 240, 300].map((deg, i) => {
      const wobble = Math.sin(i * 1.7) * 1.2;
      return (
        <ellipse
          key={deg}
          cx="60"
          cy="42"
          rx={14 + wobble}
          ry={20 + wobble * 0.4}
          fill={specimen.petal}
          stroke={specimen.petalDeep}
          strokeWidth="0.6"
          opacity="0.9"
          transform={`rotate(${deg} 60 65)`}
        />
      );
    })}
    {/* Watercolor-bleed highlight on each petal */}
    {[0, 60, 120, 180, 240, 300].map((deg, i) => (
      <ellipse
        key={`b-${deg}`}
        cx="60"
        cy="36"
        rx={4 + (i % 2) * 1.5}
        ry={8}
        fill={specimen.accent}
        opacity="0.35"
        transform={`rotate(${deg} 60 65)`}
      />
    ))}
    {/* Petal midribs */}
    {[0, 60, 120, 180, 240, 300].map((deg) => (
      <line
        key={`m-${deg}`}
        x1="60"
        y1="28"
        x2="60"
        y2="62"
        stroke={specimen.petalDeep}
        strokeWidth="0.4"
        opacity="0.5"
        transform={`rotate(${deg} 60 65)`}
      />
    ))}
    {/* Center disc with stamen dots */}
    <circle cx="60" cy="65" r="11" fill={specimen.petalDeep} stroke="#2E1A0E" strokeWidth="0.5" />
    <circle cx="60" cy="65" r="7" fill={specimen.accent} opacity="0.55" />
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <circle
        key={`d-${i}`}
        cx={60 + Math.cos((i * 45 * Math.PI) / 180) * 3.2}
        cy={65 + Math.sin((i * 45 * Math.PI) / 180) * 3.2}
        r="0.8"
        fill="#2E1A0E"
      />
    ))}
  </svg>
);

// Folded paper corner peeking from the bottom-right
const FoldedNoteCorner = ({ specimen }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block' }}
  >
    <path
      d="M0 40 L40 40 L40 0 Z"
      fill={specimen.accent}
      stroke={specimen.petalDeep}
      strokeWidth="0.5"
      opacity="0.9"
    />
    <path d="M0 40 L40 0" stroke={specimen.petalDeep} strokeWidth="0.6" opacity="0.55" />
    <circle cx="23" cy="15" r="1.3" fill={specimen.petalDeep} opacity="0.7" />
  </svg>
);

// Museum specimen tag hanging from a string — top of each card
const SpecimenTag = ({ no, name }) => (
  <div style={styles.tagWrap}>
    <svg
      width="52"
      height="84"
      viewBox="0 0 52 84"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.35))' }}
    >
      {/* Pin hole */}
      <circle cx="26" cy="6" r="2" fill="#1A1208" />
      <circle cx="26" cy="6" r="1" fill="#3E2A1A" />
      {/* String */}
      <path d="M26 8 Q24 14, 26 20" stroke="#3E2A1A" strokeWidth="0.8" fill="none" />
      {/* Tag body — pointed at bottom, like a real specimen label */}
      <path
        d="M6 20 L46 20 L46 70 L26 80 L6 70 Z"
        fill="#EFE0BC"
        stroke="#3E2A1A"
        strokeWidth="0.6"
      />
      {/* Typewriter text */}
      <text
        x="26"
        y="34"
        textAnchor="middle"
        fontSize="8"
        fontFamily="'Special Elite', 'Courier New', monospace"
        fill="#3E2A1A"
        letterSpacing="1.5"
      >
        No. {no}
      </text>
      <line x1="10" y1="40" x2="42" y2="40" stroke="#3E2A1A" strokeWidth="0.3" opacity="0.5" />
      <text
        x="26"
        y="52"
        textAnchor="middle"
        fontSize="7"
        fontFamily="'Special Elite', 'Courier New', monospace"
        fill="#3E2A1A"
        letterSpacing="0.5"
      >
        ANNO
      </text>
      <text
        x="26"
        y="64"
        textAnchor="middle"
        fontSize="9"
        fontFamily="'Special Elite', 'Courier New', monospace"
        fill="#3E2A1A"
        fontWeight="bold"
        letterSpacing="0.5"
      >
        MMXXVI
      </text>
    </svg>
  </div>
);

// Torn top edge for the long letter — like a page ripped from a notebook
const TornTop = () => (
  <svg
    viewBox="0 0 400 14"
    preserveAspectRatio="none"
    style={{ width: '100%', height: '14px', display: 'block' }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 14 L0 7 L12 11 L26 3 L44 9 L62 5 L84 11 L108 4 L132 10 L156 6 L182 12 L208 3 L234 9 L260 11 L286 5 L312 12 L338 7 L362 10 L382 4 L400 8 L400 14 Z"
      fill="#F0E2BD"
      stroke="#3E2A1A"
      strokeWidth="0.5"
      strokeLinejoin="round"
    />
  </svg>
);

// Postage stamp — sits on the envelope
const PostageStamp = () => (
  <svg
    width="48"
    height="58"
    viewBox="0 0 48 58"
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}
  >
    {/* Perforated edge — notches along each side */}
    <rect x="2" y="2" width="44" height="54" fill="#EFE0BC" stroke="#3E2A1A" strokeWidth="0.5" />
    {Array.from({ length: 8 }).map((_, i) => (
      <circle key={`t-${i}`} cx={6 + i * 5.5} cy="1" r="1" fill="#1A1208" />
    ))}
    {Array.from({ length: 8 }).map((_, i) => (
      <circle key={`b-${i}`} cx={6 + i * 5.5} cy="57" r="1" fill="#1A1208" />
    ))}
    {Array.from({ length: 9 }).map((_, i) => (
      <circle key={`l-${i}`} cx="1" cy={4 + i * 6} r="1" fill="#1A1208" />
    ))}
    {Array.from({ length: 9 }).map((_, i) => (
      <circle key={`r-${i}`} cx="47" cy={4 + i * 6} r="1" fill="#1A1208" />
    ))}
    {/* Inner border */}
    <rect x="6" y="6" width="36" height="46" fill="none" stroke="#3E2A1A" strokeWidth="0.4" />
    {/* Tiny pressed flower silhouette */}
    <g transform="translate(24 22)">
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="0"
          cy="-5"
          rx="2"
          ry="3.5"
          fill="#7A1A2A"
          opacity="0.85"
          transform={`rotate(${deg})`}
        />
      ))}
      <circle cx="0" cy="0" r="1.6" fill="#3E2A1A" />
    </g>
    {/* Date in typewriter font */}
    <text
      x="24"
      y="40"
      textAnchor="middle"
      fontSize="6"
      fontFamily="'Special Elite', 'Courier New', monospace"
      fill="#3E2A1A"
      letterSpacing="0.5"
    >
      26·VIII
    </text>
    <text
      x="24"
      y="48"
      textAnchor="middle"
      fontSize="5"
      fontFamily="'Special Elite', 'Courier New', monospace"
      fill="#3E2A1A"
      letterSpacing="0.5"
    >
      MMXXVI
    </text>
  </svg>
);

// Faded postmark — sits on the envelope, overlapping the stamp
const Postmark = () => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 60 60"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: 'rotate(-14deg)', opacity: 0.5 }}
  >
    <circle cx="30" cy="30" r="22" fill="none" stroke="#7A1A2A" strokeWidth="1.2" />
    <circle cx="30" cy="30" r="18" fill="none" stroke="#7A1A2A" strokeWidth="0.5" />
    <text
      x="30"
      y="20"
      textAnchor="middle"
      fontSize="6"
      fontFamily="'Special Elite', 'Courier New', monospace"
      fill="#7A1A2A"
      letterSpacing="1"
    >
      DAVAO
    </text>
    <text
      x="30"
      y="34"
      textAnchor="middle"
      fontSize="9"
      fontFamily="'Special Elite', 'Courier New', monospace"
      fontWeight="bold"
      fill="#7A1A2A"
    >
      26·VIII
    </text>
    <text
      x="30"
      y="44"
      textAnchor="middle"
      fontSize="5.5"
      fontFamily="'Special Elite', 'Courier New', monospace"
      fill="#7A1A2A"
      letterSpacing="0.5"
    >
      MMXXVI
    </text>
  </svg>
);

// Hand-drawn arrow + "tap" — points to the wax seal
const HandArrow = () => (
  <svg
    width="70"
    height="44"
    viewBox="0 0 70 44"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block' }}
  >
    <path
      d="M4 6 Q22 4, 38 14 Q48 20, 56 30"
      stroke="#E8D5A0"
      strokeWidth="1.4"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M50 24 L56 30 L50 33"
      stroke="#E8D5A0"
      strokeWidth="1.4"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <text
      x="8"
      y="20"
      fontFamily="'Caveat', cursive"
      fontSize="18"
      fill="#E8D5A0"
    >
      tap
    </text>
  </svg>
);

// Hand-drawn flourish under the title — a small wavy line + tiny dot
const Flourish = () => (
  <svg
    width="120"
    height="14"
    viewBox="0 0 120 14"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', margin: '6px auto 0' }}
  >
    <path
      d="M4 8 Q20 2, 36 8 T68 8 T100 8 Q108 6, 116 8"
      stroke="#C9A227"
      strokeWidth="1"
      fill="none"
      strokeLinecap="round"
      opacity="0.7"
    />
    <circle cx="60" cy="8" r="1.5" fill="#C9A227" opacity="0.7" />
  </svg>
);

// Tiny pressed-flower motif used IN the wax seal (replaces the AI-cliche monogram)
const SealFlower = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    {[0, 72, 144, 216, 288].map((deg) => (
      <ellipse
        key={deg}
        cx="10"
        cy="4"
        rx="2"
        ry="3.4"
        fill="#C9A227"
        opacity="0.85"
        transform={`rotate(${deg} 10 10)`}
      />
    ))}
    <circle cx="10" cy="10" r="1.6" fill="#C9A227" opacity="0.95" />
  </svg>
);

const SixthMonthversary = () => {
  const [now, setNow] = useState(new Date());
  const [pickedSpecimens, setPickedSpecimens] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [envelopeVisible, setEnvelopeVisible] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [letterVisible, setLetterVisible] = useState(false);
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
      link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700&family=Special+Elite&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, []);

  const handleSpecimenTap = (specimen) => {
    if (envelopeVisible) return;
    if (activeNote !== null) return;
    if (pickedSpecimens.includes(specimen.id)) return;

    if (!musicUnlocked.current) {
      musicUnlocked.current = true;
      window.dispatchEvent(new Event(HERBARIUM_UNLOCK_EVENT));
    }

    setActiveNote(specimen);
  };

  const handleCloseNote = () => {
    if (!activeNote) return;
    const newPicked = [...pickedSpecimens, activeNote.id];
    setPickedSpecimens(newPicked);
    setActiveNote(null);

    if (newPicked.length === specimens.length) {
      setTimeout(() => setEnvelopeVisible(true), 1100);
    }
  };

  const handleOpenEnvelope = () => {
    if (!envelopeVisible || envelopeOpened) return;
    setEnvelopeOpened(true);
    setTimeout(() => setLetterVisible(true), 1200);
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
          <p style={styles.countdownLabel}>6th monthversary</p>
          <h1 style={styles.countdownTitle}>The Herbarium</h1>
          <Flourish />
          <p style={styles.countdownSub}>Pressing begins on August 26</p>
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
          <p style={styles.countdownHint}>Six pages are waiting to be filled.</p>
        </div>
      </div>
    );
  }

  // ── MAIN HERBARIUM ──
  return (
    <div style={styles.page}>
      {/* ── HEADER ── */}
      {!letterVisible && (
        <div style={styles.headerWrapper}>
          <p style={styles.topLabel}>6th monthversary</p>
          <h1 style={styles.sceneTitle}>The Herbarium</h1>
          <Flourish />
          <p style={styles.sceneSubtitle}>
            Six specimens, carefully pressed — tap each one to read what is tucked behind it.
          </p>
        </div>
      )}

      {/* ── PROGRESS DOTS ── */}
      {!letterVisible && (
        <div style={styles.progressDots}>
          {specimens.map((s) => {
            const isPicked = pickedSpecimens.includes(s.id);
            return (
              <div
                key={s.id}
                style={{
                  ...styles.dot,
                  background: isPicked ? s.petal : 'transparent',
                  boxShadow: isPicked ? `0 0 8px ${s.petal}88` : 'none',
                  borderColor: isPicked ? s.petalDeep : 'rgba(232, 213, 160, 0.35)',
                  borderStyle: isPicked ? 'solid' : 'dashed',
                }}
              />
            );
          })}
        </div>
      )}

      {/* ── SPECIMENS GRID ── */}
      {!letterVisible && !envelopeVisible && (
        <div style={styles.specimensGrid}>
          {specimens.map((specimen, i) => {
            const isPicked = pickedSpecimens.includes(specimen.id);
            const variation = cardVariations[i];
            return (
              <button
                key={specimen.id}
                type="button"
                onClick={() => handleSpecimenTap(specimen)}
                disabled={isPicked || activeNote !== null}
                aria-label={`Read the note from ${specimen.name}`}
                style={{
                  ...styles.specimenCard,
                  width: `${variation.width}px`,
                  transform: `rotate(${isPicked ? variation.rotate * 0.3 : variation.rotate}deg)`,
                  maxWidth: '100%',
                }}
                className={isPicked ? 'specimen-pressed' : 'specimen-float'}
              >
                <SpecimenTag no={specimen.no} name={specimen.name} />
                <div style={styles.specimenInner}>
                  <div style={styles.specimenIllustration}>
                    <BotanicalSVG specimen={specimen} dimmed={isPicked} />
                  </div>
                  <p style={styles.specimenLatin}>{specimen.latin}</p>
                  <p style={styles.specimenMeta}>
                    coll. <span style={styles.specimenMetaEm}>26·VIII·MMXXVI</span>
                  </p>
                  {!isPicked && (
                    <div style={styles.foldedCorner}>
                      <FoldedNoteCorner specimen={specimen} />
                    </div>
                  )}
                  {isPicked && (
                    <div style={styles.pressedStamp}>
                      <span>PRESSED</span>
                      <span style={styles.pressedDate}>· 26·VIII ·</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* ── WAX-SEALED ENVELOPE ── */}
      {envelopeVisible && !letterVisible && (
        <div
          style={styles.envelopeWrap}
          onClick={handleOpenEnvelope}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleOpenEnvelope();
          }}
          className={envelopeOpened ? '' : 'envelope-tappable'}
        >
          <p style={styles.envelopeHint}>One last specimen — sealed for you</p>

          <div style={styles.envelope} className="envelope-float">
            <svg width="300" height="190" viewBox="0 0 300 190" xmlns="http://www.w3.org/2000/svg">
              {/* Envelope back */}
              <rect
                x="10"
                y="22"
                width="280"
                height="158"
                fill="#EFE0BC"
                stroke="#3E2A1A"
                strokeWidth="1"
                rx="1"
              />
              {/* Subtle paper grain — hairlines */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <line
                  key={`h-${i}`}
                  x1="20"
                  y1={44 + i * 24}
                  x2="280"
                  y2={44 + i * 24}
                  stroke="#3E2A1A"
                  strokeWidth="0.2"
                  opacity="0.1"
                />
              ))}
              {/* Postage stamp (top-right) */}
              <g transform="translate(238 28)">
                <PostageStamp />
              </g>
              {/* Postmark (overlapping the stamp, rotated) */}
              <g transform="translate(218 60)">
                <Postmark />
              </g>
              {/* Diagonal flap — fades when opened */}
              <path
                d="M10 22 L150 120 L290 22 Z"
                fill="#D4B580"
                stroke="#3E2A1A"
                strokeWidth="1"
                style={{
                  transformOrigin: '150px 22px',
                  opacity: envelopeOpened ? 0 : 1,
                  transition: 'opacity 0.6s ease',
                }}
              />
              {/* Wax seal (closed) or crack line (opened) */}
              {!envelopeOpened && (
                <g className="wax-seal">
                  {/* Slightly irregular wax circle — not a perfect geometric shape */}
                  <path
                    d="M 150 80
                       C 165 80, 174 90, 174 105
                       C 174 121, 165 130, 150 130
                       C 134 130, 126 121, 126 105
                       C 126 90, 134 80, 150 80 Z"
                    fill="#7A1A2A"
                    stroke="#4A0E18"
                    strokeWidth="0.8"
                  />
                  <circle cx="150" cy="105" r="14" fill="none" stroke="#C9A227" strokeWidth="0.5" opacity="0.6" />
                  {/* Tiny pressed flower pressed into the wax */}
                  <g transform="translate(150 105)">
                    <SealFlower />
                  </g>
                  {/* Realistic drips */}
                  <path d="M132 124 Q128 132, 131 138" stroke="#7A1A2A" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M168 122 Q172 130, 170 136" stroke="#7A1A2A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <path d="M150 130 Q148 134, 150 138" stroke="#7A1A2A" strokeWidth="2" fill="none" strokeLinecap="round" />
                </g>
              )}
              {envelopeOpened && (
                <g style={{ animation: 'fadeIn 0.5s ease both' }}>
                  <line x1="148" y1="80" x2="152" y2="130" stroke="#4A0E18" strokeWidth="2" opacity="0.85" />
                  <line x1="147" y1="84" x2="153" y2="86" stroke="#4A0E18" strokeWidth="1.2" opacity="0.6" />
                  <line x1="147" y1="124" x2="153" y2="126" stroke="#4A0E18" strokeWidth="1.2" opacity="0.6" />
                  <circle cx="138" cy="96" r="2" fill="#7A1A2A" opacity="0.7" />
                  <circle cx="162" cy="114" r="1.5" fill="#7A1A2A" opacity="0.6" />
                  <circle cx="156" cy="80" r="1.2" fill="#7A1A2A" opacity="0.5" />
                </g>
              )}
            </svg>

            {/* Hand-drawn arrow pointing to the seal */}
            {!envelopeOpened && (
              <div style={styles.envelopeArrow}>
                <HandArrow />
              </div>
            )}
          </div>

          <p style={styles.envelopeTap}>{envelopeOpened ? 'opening…' : ''}</p>
        </div>
      )}

      {/* ── LONG LETTER ── */}
      {letterVisible && (
        <div style={styles.letterWrap} className="letter-rise">
          <p style={styles.letterBadge}>6 months of us</p>
          <h1 style={styles.letterTitle}>Happy 6th Monthversary</h1>

          <div style={styles.letterCardOuter}>
            <TornTop />
            <div style={styles.letterCard}>
              <p style={styles.letterDate}>26·VIII·MMXXVI</p>
              <p style={styles.letterPara}>
                Six months ago, you walked into my ordinary days, and I have been pressing every
                moment of you into the pages of my memory ever since — because I never want to
                forget a single one.
              </p>
              <p style={styles.letterPara}>
                You taught me that love is not one grand gesture. It is all the small ones,
                pressed flat and dried and kept. The way you laugh at nothing. The way you
                remember what I said three weeks ago. The way you show up — every single time —
                like it is the easiest thing in the world.
              </p>
              <p style={styles.letterHighlight}>
                I have six pressed flowers in this little herbarium, but for you, I could fill
                a thousand more pages — because every reason I love you is its own specimen,
                worthy of being kept.
              </p>
              <p style={styles.letterPara}>
                Thank you for six months. Thank you for being my favorite hello and my hardest
                goodbye. Thank you for staying — and for letting me press all of it, even the
                ordinary days, between the pages of us.
              </p>
              <p style={styles.letterPara}>
                Here is to every memory we have already preserved, and every one we have not yet
                pressed. I am going to keep choosing you the way a botanist keeps choosing the
                same field, season after season, because there is always one more bloom worth
                saving.
              </p>
              <div style={styles.letterSignature}>
                <p style={styles.letterSigLine}>Yours, always in bloom,</p>
                <p style={styles.letterSigName}>— Gagas</p>
              </div>
              <svg
                width="22"
                height="20"
                viewBox="0 0 22 20"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: 'block', marginLeft: 'auto', marginTop: '14px' }}
              >
                <path
                  d="M11 17 C 6 12, 2 8, 3 5 C 4 2, 8 2, 11 6 C 14 2, 18 2, 19 5 C 20 8, 16 12, 11 17 Z"
                  fill="none"
                  stroke="#7A1A2A"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                  opacity="0.65"
                />
              </svg>
            </div>
          </div>

          <p style={styles.letterFooter}>
            Six pressed. Hundreds still waiting to be collected.
          </p>
        </div>
      )}

      {/* ── ACTIVE NOTE OVERLAY ── */}
      {activeNote && (
        <div style={styles.noteOverlay} onClick={handleCloseNote}>
          <div
            style={{
              ...styles.noteCard,
              borderColor: `${activeNote.petal}55`,
              transform: `rotate(${(parseInt(activeNote.no, 10) % 2 === 0 ? -1 : 1) * 0.6}deg)`,
            }}
            className="note-unfold"
          >
            <div style={styles.noteHeader}>
              <div style={styles.noteFlower}>
                <BotanicalSVG specimen={activeNote} />
              </div>
              <div style={styles.noteMetaBlock}>
                <p style={styles.noteName}>{activeNote.name}</p>
                <p style={styles.noteLatin}>{activeNote.latin}</p>
                <p style={styles.noteNo}>Specimen No. {activeNote.no} · Anno MMXXVI</p>
              </div>
            </div>

            <div style={styles.noteDivider} />

            <div style={styles.noteTextWrap}>
              <p style={styles.noteText}>{activeNote.text}</p>
            </div>

            <p style={styles.noteTapClose} onClick={handleCloseNote}>
              press &amp; keep
            </p>
          </div>
        </div>
      )}

      <MusicPlayer
        playlist={playlist}
        loop={true}
        autoplayOnMount={false}
        unlockEventName={HERBARIUM_UNLOCK_EVENT}
        showPromptUi={false}
      />

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes specimenFloat {
          0%, 100% { transform: rotate(var(--rot)) translateY(0); }
          50%      { transform: rotate(calc(var(--rot) + 0.4deg)) translateY(-2px); }
        }
        @keyframes envelopeFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-5px); }
        }
        @keyframes envelopeIn {
          0%   { opacity: 0; transform: translateY(50px) scale(0.92); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes stampIn {
          0%   { opacity: 0; transform: scale(2.4) rotate(-22deg); }
          60%  { opacity: 0.85; transform: scale(0.92) rotate(-12deg); }
          100% { opacity: 0.78; transform: scale(1) rotate(-9deg); }
        }
        @keyframes waxPulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 4px 10px rgba(122, 26, 42, 0.5)); }
          50%      { transform: scale(1.04); filter: drop-shadow(0 4px 14px rgba(122, 26, 42, 0.7)); }
        }
        @keyframes letterRise {
          0%   { opacity: 0; transform: translateY(70px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes noteUnfold {
          0%   { opacity: 0; transform: scale(0.92) rotate(0); }
          100% { opacity: 1; transform: scale(1) rotate(var(--tilt, 0deg)); }
        }

        .specimen-float {
          animation: specimenFloat 5s ease-in-out infinite;
        }
        .specimen-pressed {
          animation: stampIn 0.6s ease both;
        }
        .envelope-float {
          animation: envelopeFloat 4s ease-in-out infinite, envelopeIn 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          transform-origin: center;
          position: relative;
        }
        .envelope-tappable {
          transition: transform 0.15s ease;
        }
        .envelope-tappable:active {
          transform: scale(0.97);
        }
        .wax-seal {
          animation: waxPulse 2.5s ease-in-out infinite;
          transform-origin: 150px 105px;
          transform-box: fill-box;
        }
        .letter-rise {
          animation: letterRise 1.1s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .note-unfold {
          --tilt: 0deg;
          animation: noteUnfold 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
      `}</style>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#1A2E22',
    backgroundImage: PAPER_NOISE,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontFamily: "'Lora', Georgia, serif",
    boxSizing: 'border-box',
    padding: '44px 20px 60px',
    position: 'relative',
    overflow: 'hidden',
  },

  // ── Countdown ──
  countdownWrapper: {
    textAlign: 'center',
    animation: 'fadeUp 0.8s ease-out both',
    position: 'relative',
    zIndex: 2,
    padding: '40px 30px',
    background: '#1A2E22',
    backgroundImage: PAPER_NOISE,
    borderRadius: '2px',
    border: '1px solid rgba(232, 213, 160, 0.2)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    maxWidth: '420px',
    width: 'calc(100% - 32px)',
    marginTop: '20vh',
  },
  countdownLabel: {
    fontFamily: "'Caveat', cursive",
    fontSize: '22px',
    color: '#C9A227',
    margin: '0 0 4px 0',
  },
  countdownTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(38px, 8vw, 54px)',
    color: '#E8D5A0',
    margin: '0 0 4px 0',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    fontStyle: 'italic',
  },
  countdownSub: {
    fontSize: '13px',
    color: 'rgba(232, 213, 160, 0.6)',
    margin: '14px 0 28px 0',
    fontStyle: 'italic',
    fontFamily: "'Caveat', cursive",
    fontSize: '20px',
  },
  countdownTimer: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  countdownUnit: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'rgba(232, 213, 160, 0.06)',
    borderRadius: '2px',
    padding: '10px 12px',
    minWidth: '58px',
    border: '1px solid rgba(232, 213, 160, 0.15)',
  },
  countdownValue: {
    fontSize: '28px',
    fontWeight: 600,
    color: '#E8D5A0',
    fontFamily: "'Cormorant Garamond', serif",
  },
  countdownLabelSmall: {
    fontSize: '9px',
    color: 'rgba(232, 213, 160, 0.5)',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginTop: '2px',
    fontFamily: "'Special Elite', 'Courier New', monospace",
  },
  countdownHint: {
    fontFamily: "'Caveat', cursive",
    fontSize: '20px',
    color: '#C9A227',
    margin: 0,
  },

  // ── Header ──
  headerWrapper: {
    textAlign: 'center',
    marginBottom: '24px',
    animation: 'fadeUp 0.8s ease-out both',
    zIndex: 1,
  },
  topLabel: {
    fontFamily: "'Caveat', cursive",
    fontSize: '22px',
    color: '#C9A227',
    margin: '0 0 4px 0',
  },
  sceneTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(34px, 7vw, 48px)',
    color: '#E8D5A0',
    margin: '0 0 0 0',
    fontWeight: 600,
    textAlign: 'center',
    letterSpacing: '-0.01em',
    fontStyle: 'italic',
  },
  sceneSubtitle: {
    fontFamily: "'Caveat', cursive",
    fontSize: '19px',
    color: 'rgba(232, 213, 160, 0.7)',
    margin: '4px 0 0 0',
    textAlign: 'center',
    maxWidth: '380px',
    lineHeight: 1.4,
  },

  // ── Progress ──
  progressDots: {
    display: 'flex',
    gap: '10px',
    marginBottom: '32px',
    zIndex: 1,
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    transition: 'all 0.4s ease',
    border: '1px solid',
  },

  // ── Specimens grid ──
  specimensGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '28px 24px',
    maxWidth: '820px',
    width: '100%',
    zIndex: 1,
    animation: 'fadeUp 0.8s ease-out 0.2s both',
    justifyContent: 'center',
    padding: '20px 0',
  },
  specimenCard: {
    backgroundColor: '#EFE0BC',
    backgroundImage: `
      ${PAPER_NOISE},
      linear-gradient(165deg, #F4E4C1 0%, #EFE0BC 50%, #DCC58E 100%)
    `,
    border: '1px solid rgba(62, 42, 26, 0.25)',
    borderRadius: '2px',
    padding: '48px 18px 24px',
    position: 'relative',
    boxShadow:
      '0 10px 26px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -2px 8px rgba(62, 26, 14, 0.06)',
    WebkitTapHighlightColor: 'transparent',
    fontFamily: 'inherit',
  },
  specimenInner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  specimenIllustration: {
    marginBottom: '2px',
  },
  specimenLatin: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '17px',
    color: '#3E2A1A',
    margin: '8px 0 2px 0',
    fontStyle: 'italic',
    fontWeight: 600,
  },
  specimenMeta: {
    fontFamily: "'Special Elite', 'Courier New', monospace",
    fontSize: '9px',
    color: 'rgba(62, 42, 26, 0.55)',
    margin: 0,
    letterSpacing: '1.2px',
    textTransform: 'uppercase',
  },
  specimenMetaEm: {
    color: 'rgba(62, 42, 26, 0.75)',
    fontWeight: 'bold',
  },
  foldedCorner: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    pointerEvents: 'none',
  },
  pressedStamp: {
    position: 'absolute',
    top: '52px',
    right: '12px',
    border: '2px solid rgba(122, 26, 42, 0.75)',
    padding: '3px 6px',
    transform: 'rotate(-9deg)',
    fontFamily: "'Special Elite', 'Courier New', monospace",
    fontSize: '10px',
    fontWeight: 'bold',
    letterSpacing: '1.5px',
    color: 'rgba(122, 26, 42, 0.78)',
    textTransform: 'uppercase',
    pointerEvents: 'none',
    animation: 'stampIn 0.6s ease both',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    lineHeight: 1.3,
  },
  pressedDate: {
    fontSize: '7px',
    letterSpacing: '0.5px',
    opacity: 0.75,
  },
  tagWrap: {
    position: 'absolute',
    top: '-22px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 2,
  },

  // ── Envelope ──
  envelopeWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    cursor: 'pointer',
    zIndex: 1,
  },
  envelope: {
    filter: 'drop-shadow(0 14px 30px rgba(0, 0, 0, 0.5))',
    position: 'relative',
  },
  envelopeArrow: {
    position: 'absolute',
    right: '-14px',
    bottom: '20px',
    transform: 'rotate(-12deg)',
  },
  envelopeHint: {
    fontFamily: "'Caveat', cursive",
    fontSize: '22px',
    color: '#C9A227',
    margin: '0 0 18px 0',
    textAlign: 'center',
  },
  envelopeTap: {
    fontFamily: "'Caveat', cursive",
    fontSize: '18px',
    color: 'rgba(232, 213, 160, 0.6)',
    margin: '16px 0 0 0',
    textAlign: 'center',
    fontStyle: 'italic',
    minHeight: '24px',
  },

  // ── Letter ──
  letterWrap: {
    maxWidth: '560px',
    width: '100%',
    zIndex: 1,
  },
  letterBadge: {
    fontFamily: "'Caveat', cursive",
    fontSize: '22px',
    color: '#C9A227',
    textAlign: 'center',
    margin: '0 0 4px 0',
  },
  letterTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(30px, 7vw, 44px)',
    color: '#E8D5A0',
    textAlign: 'center',
    margin: '0 0 24px 0',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    fontStyle: 'italic',
  },
  letterCardOuter: {
    position: 'relative',
  },
  letterCard: {
    backgroundColor: '#F0E2BD',
    backgroundImage: `
      ${PAPER_NOISE},
      linear-gradient(160deg, #F4E4C1 0%, #EFE0BC 100%)
    `,
    border: '1px solid rgba(62, 42, 26, 0.2)',
    borderTop: 'none',
    borderRadius: '0 0 2px 2px',
    padding: '28px 34px 36px',
    boxShadow:
      '0 18px 50px rgba(0, 0, 0, 0.45)',
    position: 'relative',
  },
  letterDate: {
    position: 'absolute',
    top: '14px',
    right: '20px',
    fontFamily: "'Special Elite', 'Courier New', monospace",
    fontSize: '10px',
    color: 'rgba(62, 42, 26, 0.6)',
    letterSpacing: '1px',
    margin: 0,
  },
  letterPara: {
    fontSize: '15px',
    color: '#3E2A1A',
    lineHeight: 1.85,
    margin: '0 0 18px 0',
    fontFamily: "'Lora', Georgia, serif",
  },
  letterHighlight: {
    fontSize: '18px',
    color: '#7A1A2E',
    lineHeight: 1.7,
    margin: '0 0 18px 0',
    fontStyle: 'italic',
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 600,
    textAlign: 'center',
    padding: '12px 4px',
    borderTop: '1px solid rgba(62, 42, 26, 0.2)',
    borderBottom: '1px solid rgba(62, 42, 26, 0.2)',
  },
  letterSignature: {
    textAlign: 'right',
    borderTop: '1px solid rgba(62, 42, 26, 0.18)',
    paddingTop: '18px',
    marginTop: '14px',
  },
  letterSigLine: {
    fontFamily: "'Caveat', cursive",
    fontSize: '24px',
    color: '#3E2A1A',
    margin: '0 0 2px 0',
  },
  letterSigName: {
    fontFamily: "'Caveat', cursive",
    fontSize: '18px',
    color: 'rgba(62, 42, 26, 0.6)',
    margin: 0,
  },
  letterFooter: {
    fontFamily: "'Caveat', cursive",
    fontSize: '20px',
    color: 'rgba(232, 213, 160, 0.65)',
    textAlign: 'center',
    marginTop: '28px',
    marginBottom: 0,
  },

  // ── Note overlay ──
  noteOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(20, 38, 26, 0.94)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    padding: '20px',
    boxSizing: 'border-box',
  },
  noteCard: {
    width: '100%',
    maxWidth: '380px',
    padding: '28px 26px 22px',
    borderRadius: '2px',
    backgroundColor: '#F0E2BD',
    backgroundImage: `
      ${PAPER_NOISE},
      linear-gradient(160deg, #F4E4C1 0%, #EFE0BC 100%)
    `,
    border: '1px solid rgba(62, 42, 26, 0.3)',
    boxShadow:
      '0 24px 70px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
    position: 'relative',
  },
  noteHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '14px',
  },
  noteFlower: {
    flexShrink: 0,
  },
  noteMetaBlock: {
    flex: 1,
  },
  noteName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '22px',
    color: '#3E2A1A',
    margin: '0 0 2px 0',
    fontStyle: 'italic',
    fontWeight: 600,
  },
  noteLatin: {
    fontFamily: "'Lora', Georgia, serif",
    fontSize: '13px',
    color: 'rgba(62, 42, 26, 0.65)',
    margin: 0,
    fontStyle: 'italic',
  },
  noteNo: {
    fontFamily: "'Special Elite', 'Courier New', monospace",
    fontSize: '9px',
    color: 'rgba(62, 42, 26, 0.5)',
    margin: '4px 0 0 0',
    letterSpacing: '1.2px',
    textTransform: 'uppercase',
  },
  noteDivider: {
    height: '1px',
    background: 'rgba(62, 42, 26, 0.2)',
    margin: '0 0 18px 0',
  },
  noteTextWrap: {
    marginBottom: '16px',
  },
  noteText: {
    fontFamily: "'Caveat', cursive",
    fontSize: '26px',
    color: '#3E2A1A',
    lineHeight: 1.5,
    margin: 0,
    textAlign: 'center',
  },
  noteTapClose: {
    fontFamily: "'Caveat', cursive",
    fontSize: '16px',
    color: 'rgba(62, 42, 26, 0.55)',
    margin: 0,
    textAlign: 'center',
    letterSpacing: '0.5px',
    cursor: 'pointer',
  },
};

export default SixthMonthversary;
