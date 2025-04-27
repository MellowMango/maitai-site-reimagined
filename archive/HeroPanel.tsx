import { motion } from 'framer-motion';
import Image from 'next/image';
import { Panel } from '@/lib/heroCopy'; // Import the Panel type

export default function HeroPanel({
  panel,
  isActive,
  reduced,
}: {
  panel: Panel; // Use the imported type
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

      {/* Conditionally render body content only if not reduced and panel is active */}
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