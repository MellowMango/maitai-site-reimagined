import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const BlogEventsCTA = () => {
  return (
    <section
      aria-labelledby="cta-heading"
      // Removed background color from section, added vertical padding
      className="py-12 md:py-16"
    >
      <div className="container mx-auto px-4">
        {/* Stack the two panels vertically */}
        <div className="flex flex-col space-y-4 md:space-y-6 max-w-3xl mx-auto">

          {/* Blog CTA Panel */}
          <Link
            href="/blog?cat=all"
            className={cn(
              'group relative flex items-center justify-center p-8 md:p-10 lg:p-12 rounded-lg transition-all duration-300 ease-in-out overflow-hidden',
              'bg-[#EA5F40] text-white', // Base color (Rum #EA5F40)
              'hover:bg-gradient-to-r hover:from-[#EA5F40] hover:to-[#FFA658]/80', // Rum to Marnier/80
              'focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-[#EA5F40]'
            )}
          >
            <span className="text-xl md:text-2xl lg:text-3xl font-semibold z-10">
              Explore our Blog
            </span>
            <ArrowRight className="absolute right-8 top-1/2 -translate-y-1/2 h-6 w-6 text-white opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:right-6 md:group-hover:right-8" />
          </Link>

          {/* Events CTA Panel */}
          <Link
            href="/blog?cat=events"
            className={cn(
              'group relative flex items-center justify-center p-8 md:p-10 lg:p-12 rounded-lg transition-all duration-300 ease-in-out overflow-hidden',
              'bg-[#FC9EB5] text-white', // Base color (Pink #FC9EB5)
              'hover:bg-gradient-to-r hover:from-[#FC9EB5] hover:to-pink-400/80', // Pink to slightly darker pink/80
              'focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-[#FC9EB5]'
            )}
          >
             <span className="text-xl md:text-2xl lg:text-3xl font-semibold z-10">
              Explore Upcoming Events
            </span>
            <ArrowRight className="absolute right-8 top-1/2 -translate-y-1/2 h-6 w-6 text-white opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:right-6 md:group-hover:right-8" />
          </Link>

        </div>
      </div>
    </section>
  );
};

export default BlogEventsCTA;
