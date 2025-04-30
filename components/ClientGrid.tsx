"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link
import { clientData, ClientGridItem } from '@/lib/clients'; // Import data and type
import { cn } from '@/lib/utils'; // For conditional classes
import { Plus } from 'lucide-react'; // For the decorative plus icon
import { Button } from '@/components/ui/button'; // For "More stories" button

// --- Individual Card Components --- 

const LogoCard = ({ item }: { item: Extract<ClientGridItem, { type: 'logo' }> }) => (
  <div className="aspect-square flex items-center justify-center p-8 sm:p-10 md:p-12 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
    <Image
      src={item.logoUrl}
      alt={`${item.name} logo`}
      width={180} // Adjust size as needed
      height={60} // Adjust size as needed
      className="object-contain w-auto h-auto max-w-full max-h-16" // Example sizing
      loading="lazy"
    />
  </div>
);

const QuoteCard = ({ item }: { item: Extract<ClientGridItem, { type: 'quote' }> }) => (
  <div
    className={cn(
      "p-6 sm:p-8 rounded-lg border border-gray-200 flex flex-col justify-between h-full relative", // Added relative positioning
      item.bgColor || 'bg-gray-100', // Default background
      item.textColor || 'text-gray-800' // Default text color
    )}
  >
    <div>
      <p className="text-lg sm:text-xl font-medium mb-4">{item.quote}</p>
    </div>
    <div className="text-sm">
      <p className="font-semibold">{item.name}</p>
      <p>{item.title}, {item.company}</p>
    </div>
    {/* Decorative Plus Button - Link to specific blog post or default */}
    <Link href={item.blogUrl || "/blog/stories"}>
      <Button asChild variant="outline" size="icon" className="absolute bottom-4 right-4 h-8 w-8 rounded-full border-current text-current bg-transparent hover:bg-current/10 cursor-pointer" >
        <Plus className="h-4 w-4" />
      </Button>
    </Link>
  </div>
);

const ImageCard = ({ item }: { item: Extract<ClientGridItem, { type: 'image' }> }) => (
  <div className="aspect-square rounded-lg border border-gray-200 overflow-hidden relative group">
    <Image
      src={item.imageUrl}
      alt={`Image of ${item.name}`}
      fill // Use fill layout
      className="object-cover transition-transform duration-300 group-hover:scale-105"
      loading="lazy"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Example sizes
    />
    {/* Optional Overlay for Name/Company */}
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
       <p className="font-semibold text-sm">{item.name}</p>
       <p className="text-xs opacity-90">{item.company}</p>
    </div>
     {/* Decorative Plus Button - Link to specific blog post or default */}
     <Link href={item.blogUrl || "/blog/stories"}>
       <Button asChild variant="outline" size="icon" className="absolute bottom-4 right-4 h-8 w-8 rounded-full border-white text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm cursor-pointer">
          <Plus className="h-4 w-4" />
       </Button>
     </Link>
  </div>
);

// --- Main Grid Component --- 

const ClientGrid = () => {
  // TODO: Add loading state with skeletons

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 md:mb-16">
          Trusted by Leading Teams
        </h2>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {clientData.map((item, index) => {
            // Determine column span based on data or type
            const colSpan = item.span === 2 ? 'lg:col-span-2' : 'lg:col-span-1';
            // Quote cards might span rows on larger screens if needed (more complex)
            // const rowSpan = item.type === 'quote' ? 'lg:row-span-2' : 'lg:row-span-1'; 
            
            return (
              <div key={`${item.type}-${index}`} className={cn(colSpan /*, rowSpan*/)}>
                {item.type === 'logo' && <LogoCard item={item} />}
                {item.type === 'quote' && <QuoteCard item={item} />}
                {item.type === 'image' && <ImageCard item={item} />}
              </div>
            );
          })}
        </div>

        {/* Optional "More Stories" Button */}
        <div className="text-center mt-12 md:mt-16">
          <Button variant="outline" size="lg">
             More customer stories
             {/* Optional: Add arrow icon */}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ClientGrid;
