# Monthversary

A growing tree of monthly surprises — each monthversary is a fruit on our tree that she can tap to open.

## Concept

**Core idea:** Our relationship is a tree that grows over time. Each month, a new fruit blooms. She taps the fruit to reveal that month's surprise — a different experience every time.

### Guiding Principles

1. **The tree grows** — visually, the tree gets fuller as more months are added
2. **Each fruit is a surprise** — different format, different vibe, different interaction
3. **Fruits are locked until the date** — she sees a countdown, not the content
4. **No two months feel the same** — alternate between interactive and passive experiences
5. **The garden is ours** — warm, organic, plant-themed (she loves plants)

### Content Type Ideas

Each month alternates between **interactive** (she has to do something) and **passive** (she just enjoys). Never two of the same type in a row.

| Month # | Miv | File | Format | Type | Status |
|---------|-----|------|--------|------|--------|
| 1 | 3rd | `1-3rdMonthversary.jsx` | Gift unwrap | Interactive | ✅ Shipped |
| 2 | 4th | `4thMonthversary.jsx` | Notes jar (pull a note) | Passive | ✅ Shipped |
| 3 | 5th | `5thMonthversary.jsx` | Star map (tap a star) | Passive | ✅ Shipped |
| 4 | 6th | `6thMonthversary.jsx` | Love in Bloom (flower garden) | Interactive | ✅ Shipped |
| 5 | 7th | TBD | Scratch card | Interactive | 📋 Planned |
| 6 | 8th | TBD | Music box | Passive | 📋 Planned |
| 7 | 9th | TBD | Puzzle | Interactive | 📋 Planned |
| 8 | 10th | TBD | Letter from future | Passive | 📋 Planned |
| 9 | 11th | TBD | Time capsule | Interactive | 📋 Planned |
| 10 | 12th | TBD | Movie credits | Passive | 📋 Planned |

### Structure

```
src/pages/mimi/
├── monthversary/
│   ├── README.md              ← This file
│   ├── MonthversaryIndex.jsx  ← Landing page — shows current month with hint
│   ├── MusicPlayer.jsx        ← Optional shared music player
│   └── months/
│       ├── 1-3rdMonthversary.jsx
│       ├── 2-5thMonthversary.jsx
│       └── ...
```

### Adding a New Month

1. Create `months/X-YthMonthversary.jsx` as a standalone React component
2. Add route in `App.js`: `/mimi/monthversary/X`
3. Update `MonthversaryIndex.jsx` with the new month's hint
4. Keep the hint mysterious — no spoilers!

### Routes

```
/mimi/monthversary          → Landing page (current month)
/mimi/monthversary/3        → 3rd monthversary (gift unwrap)
/mimi/monthversary/5        → 5th monthversary (chat story)
/mimi/monthversary/...      → etc.
/mimi/monthversary/all      → Archive of all past months (future)
```
