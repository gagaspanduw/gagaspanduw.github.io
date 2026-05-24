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

| Month # | Miv | Format | Type | Description |
|---------|-----|--------|------|-------------|
| 1 | 4th | Gift unwrap | Interactive | Layered gift box — unwrap wrapping, ribbon, lid, tissue to reveal the message |
| 2 | 5th | Chat story | Passive | Fake WhatsApp/iMessage thread where messages appear one by one with typing indicators |
| 3 | 6th | Trivia game | Interactive | "How well do you know us?" quiz — she has to answer correctly to unlock the love letter at the end |
| 4 | 7th | Star map | Passive | A night sky where each star is a memory — tap stars to see what happened on that date |
| 5 | 8th | Scratch card | Interactive | Scratch-to-reveal cards with reasons you love her — satisfying scratch effect |
| 6 | 9th | Music box | Passive | Animated music box that opens and plays "your song" with lyrics scrolling |
| 7 | 10th | Puzzle | Interactive | Drag puzzle pieces to complete a photo/image — message appears when done |
| 8 | 11th | Letter from future | Passive | "A letter from us, 1 year from now" — written as if you're looking back |
| 9 | 12th | Time capsule | Interactive | She picks from sealed envelopes — each has a different memory/promise/photo |
| 10 | 13th | Movie credits | Passive | Animated movie-style credits rolling your relationship highlights with soundtrack |

### Structure

```
src/pages/mimi/
├── monthversary/
│   ├── README.md              ← This file
│   ├── MonthversaryIndex.jsx  ← Landing page — shows current month with hint
│   ├── MusicPlayer.jsx        ← Optional shared music player
│   └── months/
│       ├── 1-4thMonthversary.jsx
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
/mimi/monthversary/4        → 4th monthversary (gift unwrap)
/mimi/monthversary/5        → 5th monthversary (chat story)
/mimi/monthversary/...      → etc.
/mimi/monthversary/all      → Archive of all past months (future)
```
