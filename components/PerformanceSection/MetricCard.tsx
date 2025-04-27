import React from 'react';

interface MetricCardProps {
  // TODO: Define props based on lib/metrics.ts
  id: string;
  title: string;
  subhead: string;
  // chart: StaticImageData; // Needs next/image import
}

const MetricCard: React.FC<MetricCardProps> = ({ id, title, subhead }) => {
  return (
    <div>
      {/* TODO: Implement MetricCard layout */}
      <h3>{title}</h3>
      <p>{subhead}</p>
      {/* Placeholder for chart */}
    </div>
  );
};

export default MetricCard;
