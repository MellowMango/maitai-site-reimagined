import React from 'react';
import { motion } from 'framer-motion';
import CTACard from './CTACard';

const BlogEventsCTA = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeInOut', staggerChildren: 0.1 }
    },
  };

  return (
    <motion.section
      aria-labelledby="cta-heading"
      className="py-12 md:py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:space-y-0 md:space-x-6 justify-center items-stretch">

          <div className="flex-1 md:max-w-[680px] mb-4 md:mb-0">
            <CTACard
              href="/blog?cat=all"
              baseColor="#EA5F40"
              highlightColor="#FFA658"
              focusRingColor="focus-visible:ring-[#EA5F40]"
            >
              Explore our Blog
            </CTACard>
          </div>

          <div className="flex-1 md:max-w-[680px]">
            <CTACard
              href="/blog?cat=events"
              baseColor="#a78bfa"
              highlightColor="#ddd6fe"
              focusRingColor="focus-visible:ring-violet-400"
            >
              Explore Upcoming Events
            </CTACard>
          </div>

        </div>
      </div>
    </motion.section>
  );
};

export default BlogEventsCTA;
