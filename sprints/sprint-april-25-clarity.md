# sprint.md — Maitai Homepage Clarity Overhaul

**Goal:** Ship a razor-sharp, production-ready homepage that instantly communicates Maitai’s value: auto-routing and self-healing AI infrastructure for text and voice.  
Breakdown by segments (parallel-friendly chunks), not calendar days.

---

────────────────────────────────────────────────────────────────────────────  
## SEGMENT 1  | COPY & MESSAGING FRAMEWORK (✅ COMPLETE)  
────────────────────────────────────────────────────────────────────────────  
**files:** `components/OrchestratorConstellation.tsx`, `next-seo.config.mjs`

- [x] Replace hero headline → “Run Better AI — Automatically.” (in `OrchestratorConstellation.tsx`)  
- [x] Add subhead → “Maitai auto-detects issues, optimizes tokens, and reroutes models in real time.”  
- [x] Add micro-prompt: “What do you want to build? → Voicebot? Chatbot? Workflow?”  
- [x] CTA buttons: **Start Building** + **See Live Demo**  
- [x] Update OG title/description in `next-seo.config.mjs`

---

────────────────────────────────────────────────────────────────────────────  
## SEGMENT 2  | USER-FOCUS MODE TOGGLE (✅ COMPLETE)  
────────────────────────────────────────────────────────────────────────────  
**files:**  
- `components/ModeToggle.tsx`  
- `hooks/useFocusModeStore.ts`  
- `components/FocusModeWrappers.tsx`  
- `app/page.tsx`  
- `components/FeaturesGrid.tsx`

- [x] Build `ModeToggle` with Zustand store (voice | text | both)  
- [x] Persist in `localStorage` & sync with URL param `?focus=`  
- [x] Emit analytics `mode_toggle` (placeholder)  
- [x] Wrap hero and downstream sections in `<IfVoice>` / `<IfText>` / `<IfBoth>`  
- [x] Integrate `ModeToggle` into UI (`app/page.tsx`)  
- [x] Apply wrappers (`<IfVoice>`, etc.) to relevant content (e.g. `FeaturesGrid`)

---

Here’s a tightened Segment 3 spec that turns the screenshots you just shared into a bullet-proof implementation brief. Everything below plugs straight into the existing sprint doc you’re already tracking.

────────────────────────────────────────────────────────────────────────────
SEGMENT 3  | HERO EXPLAINER — React-Coded Panels  (🟡 IN PROGRESS)
────────────────────────────────────────────────────────────────────────────
📂  files
     lib/heroCopy.ts
     public/hero-maitai-assets/*
     components/HeroMaitai.tsx
     components/HeroPanel.tsx
     hooks/usePrefersReducedMotion.ts

🎯  outcome
     • A self-contained React + Framer Motion animation that mirrors the
       “floating cards” style—but branded for Maitai and **100 % code-driven**.
     • Works with or without motion (pref-reduced fallback).
     • No dependencies on Actively assets, no Lottie, no After Effects.

─────────────────
A) DATA DEFINITIONS
─────────────────
lib/heroCopy.ts
```ts
// Copy & coordinates; tweak X/Y if design changes.
export const heroPhrases = [
  'Real-Time Voice & Text Orchestration',
  'Adaptive Token Optimization',
  'Self-Healing Model Routing',
];

export const heroPanels = [
  {
    key: 'orchestration',
    title: 'Real-Time Voice & Text Orchestration',
    icon: '/hero-maitai-assets/mic.svg',
    width: 260,
    height: 140,
    x: 32,
    y: 20,
    body: [
      { label: 'Site Visit', value: 'Yes' },
      { label: 'Latency',   value: '< 5 ms' },
      { label: 'Models',    value: 'maitai-llama-3.1-8b' },
    ],
  },
  {
    key: 'optimization',
    title: 'Adaptive Token Optimization',
    icon: '/hero-maitai-assets/clock.svg',
    width: 260,
    height: 140,
    x: 32,
    y: 170,
    body: [
      { label: 'Spend Saved', value: '-42 %' },
      { label: 'Avg TPM',    value: '-31 %' },
      { label: 'Quality',    value: '↑ 99.2 %' },
    ],
  },
  {
    key: 'selfHealing',
    title: 'Self-Healing Model Routing',
    icon: '/hero-maitai-assets/shield.svg',
    width: 260,
    height: 140,
    x: 32,
    y: 320,
    body: [
      { label: 'Uptime',      value: '4 nines' },
      { label: 'Failovers',   value: 'auto'   },
      { label: 'TTFT',        value: '75 ms'  },
    ],
  },
];

─────────────────
B) REUSABLE PANEL
─────────────────
components/HeroPanel.tsx

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroPanel({
  panel, isActive, reduced,
}: {
  panel: Panel;
  isActive: boolean;
  reduced: boolean;
}) {
  const { title, icon, width, height, x, y, body } = panel;

  return (
    <motion.div
      data-hero={panel.key}
      className="absolute rounded-xs border border-neutral-200 bg-white shadow-lg shadow-neutral-900/10
                 flex flex-col overflow-hidden select-none"
      initial={{ width, height, top: y, left: x, opacity: 0 }}
      animate={{
        opacity: 1,
        scale: isActive ? 1 : 0.92,
        filter: isActive ? 'brightness(1)' : 'brightness(0.75)',
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <header className="flex items-center gap-2 border-b border-neutral-200 h-12 px-4 shrink-0">
        <Image src={icon} alt="" width={18} height={18} />
        <span className="text-neutral-950">{title}</span>
      </header>

      {!reduced && isActive && (
        <div className="grow bg-dot-grid p-4 text-sm leading-6">
          {body.map((row) => (
            <div key={row.label} className="flex justify-between">
              <span className="text-neutral-600">{row.label}</span>
              <span>{row.value}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

─────────────────
C) MASTER COMPONENT
─────────────────
components/HeroMaitai.tsx

'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { heroPhrases, heroPanels } from '@/lib/heroCopy';
import HeroPanel from './HeroPanel';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

const SWITCH = 3000;

export default function HeroMaitai() {
  const [idx, setIdx] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;           // stop cycling for reduced-motion users
    const id = setInterval(() => setIdx((i) => (i + 1) % heroPhrases.length), SWITCH);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <section className="relative w-full h-[480px] bg-dot-grid overflow-hidden">
      {/* Headline */}
      <h1 className="absolute z-10 top-4 left-4 font-semibold text-2xl">
        Run Better AI —{' '}
        <AnimatePresence mode="wait">
          <motion.span
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            {heroPhrases[idx]}
          </motion.span>
        </AnimatePresence>
      </h1>

      {/* Floating panels */}
      <AnimatePresence>
        {heroPanels.map((p, i) => (
          <HeroPanel
            key={p.key}
            panel={p}
            isActive={i === idx}
            reduced={reduced}
          />
        ))}
      </AnimatePresence>
    </section>
  );
}

─────────────────
D) REDUCED-MOTION HOOK
─────────────────
hooks/usePrefersReducedMotion.ts

import { useEffect, useState } from 'react';
export default function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefers(mq.matches);
    const handler = () => setPrefers(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return prefers;
}

─────────────────
E) TODO CHECKLIST
─────────────────
	•	Asset prep: export the mic / clock / shield icons as 32 × 32 SVG, run through SVGO, place in public/hero-maitai-assets/.
	•	Dot-grid BG: either static PNG (transparent dots, 8 px spacing) or CSS radial-gradient pattern.
	•	Unit tests: Vitest snapshot HeroMaitai renders correct phrase, cycles at 3 s when reduced === false.
	•	E2E: Cypress verifies cycling pauses when prefers-reduced-motion flag is simulated.
	•	Accessibility: aria-live="polite" on the <motion.span> so screen readers get the updated phrase.

Drop this directly into Segment 3 of your sprint doc, mark the code files as new, and carry on. Once this merges you can delete the older “HeroActively” prototype folder—this version is lighter, branded, and 100 % maintainable.