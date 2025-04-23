import React from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  backgroundColor?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  className,
  id,
  backgroundColor = 'bg-white',
}) => {
  return (
    <section
      id={id}
      className={cn(
        'py-12 sm:py-16 md:py-20 overflow-hidden relative',
        backgroundColor,
        className
      )}
    >
      <div className="container mx-auto px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}; 