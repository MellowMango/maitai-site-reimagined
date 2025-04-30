'use client';

import React from 'react';
import Image from 'next/image';
import { MetricCardData } from '@/lib/metrics';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Assuming shadcn/ui Card
import { cn } from "@/lib/utils";

// Import the specific component to check against
import TTFTComparison from './charts/TTFTComparison';

interface MetricCardProps {
    metric: MetricCardData;
    className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric, className }) => {

    const renderChart = () => {
        if (!metric.chart) return null;

        // Check if 'chart' is a string (URL path for image)
        if (typeof metric.chart === 'string') {
            return (
                <Image
                    src={metric.chart} // Use the string path directly
                    alt={`${metric.title} chart`}
                    width={500} // Provide appropriate default width
                    height={300} // Provide appropriate default height
                    className="object-contain w-full h-auto max-h-[350px]" // Constrain height
                />
            );
        }

        // Check if 'chart' is a React component
        if (typeof metric.chart === 'function' || 
            (typeof metric.chart === 'object' && React.isValidElement(metric.chart)) ||
            (typeof metric.chart === 'object' && typeof (metric.chart as any).render === 'function') ||
            (typeof metric.chart === 'object' && (metric.chart as any).$$typeof === Symbol.for('react.forward_ref')) ||
             (typeof metric.chart === 'object' && (metric.chart as any).$$typeof === Symbol.for('react.lazy'))
           )
        {
            const ChartComponent = metric.chart as React.ComponentType;
            // Removed the special wrapper for TTFT, let flexbox handle centering
            return <ChartComponent />;
        }

        // Fallback or error handling if type is unexpected
        console.warn("Unexpected chart type in MetricCard: ", metric.chart);
        return null;
    };

    return (
        <Card className={cn("flex flex-col", className)}> 
            <CardHeader className="pb-2">
                {/* Use a smaller title size for potentially complex charts */}
                <CardTitle 
                  className="text-base font-semibold text-gray-800"
                  dangerouslySetInnerHTML={{ __html: metric.title }}
                />
                {metric.subhead && (
                    /* PERF-3: Use dangerouslySetInnerHTML for subhead */
                    <p 
                      className="text-sm text-gray-500 pt-1"
                      dangerouslySetInnerHTML={{ __html: metric.subhead }}
                    />
                )}
            </CardHeader>
            {/* Increase padding-top for more space above chart */}
            <CardContent className="flex-grow flex pt-6 overflow-hidden items-center justify-center"> 
                 <div className="w-full h-full flex items-center justify-center">
                    {renderChart()}
                 </div>
            </CardContent>
        </Card>
    );
};

export default MetricCard;
