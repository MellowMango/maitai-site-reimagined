import React from 'react';

interface FeatureItemProps {
  // TODO: Define props based on lib/features.ts
  id: string;
  title: string;
  desc: string;
  // img: StaticImageData; // Needs next/image import
}

const FeatureItem: React.FC<FeatureItemProps> = ({ id, title, desc }) => {
  return (
    <li>
      {/* TODO: Implement FeatureItem layout (used in FeatureScroller list) */}
      <h4>{title}</h4>
      <p>{desc}</p>
    </li>
  );
};

export default FeatureItem;
