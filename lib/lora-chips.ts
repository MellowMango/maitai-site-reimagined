/**
 * Central place to add / update your LoRA demos.
 * Swap the mp3 filenames with real clips as soon as you have them.
 */
export type LoraChip = {
  id: string;
  label: string;
  mp3Src: string;      // public path, i.e. /audio/fintech.mp3
  transcript: string;
};

export const loraChips: LoraChip[] = [
  {
    id: 'retail',
    label: 'Retail',
    mp3Src: '/audio/lora-retail.mp3',
    transcript:
      '“Hi! Looking for a different size? I can check stock across our stores in seconds.”',
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    mp3Src: '/audio/lora-healthcare.mp3',
    transcript:
      '“Let me pull up your last lab results and schedule a follow-up with Dr. Patel.”',
  },
  {
    id: 'fintech',
    label: 'FinTech',
    mp3Src: '/audio/lora-fintech.mp3',
    transcript:
      '“Your APR drops to 12.5 % if you set up autopay—shall I enable it?”',
  },
  {
    id: 'govtech',
    label: 'GovTech',
    mp3Src: '/audio/lora-govtech.mp3',
    transcript:
      '“I\'ve located the zoning permit form you need—want me to email it now?”',
  },
] as const; 