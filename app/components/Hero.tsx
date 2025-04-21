'use client'
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[60vh] py-12">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl md:text-7xl font-[var(--font-greycliff)] font-bold text-center mb-6"
      >
        Maitai: AI that grows with you
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-xl md:text-2xl text-center max-w-2xl mb-8"
      >
        The fastest, most accurate way to deploy and manage living AI models for your product.
      </motion.p>
      <div className="flex flex-row gap-6 items-center justify-center mt-4">
        <Image src="/logos/logo-black-resized.svg" alt="Maitai Logo" width={170} height={40} priority />
        <Image src="/logos/Backed by YC.png" alt="Backed by YC" width={110} height={30} />
      </div>
    </section>
  );
}
