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

// Define Panel type for HeroPanel component
export type Panel = typeof heroPanels[0];
