'use client';

import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

interface ToggleTabsProps {
    defaultValue: string;
    onValueChange: (value: string) => void;
    tabs: {
        value: string;
        label: React.ReactNode; // Allow icons or text
    }[];
}

const ToggleTabs: React.FC<ToggleTabsProps> = ({ defaultValue, onValueChange, tabs }) => {
    return (
        <Tabs.Root
            defaultValue={defaultValue}
            onValueChange={onValueChange}
            className="flex justify-center mb-8 md:mb-10"
        >
            <Tabs.List className="inline-flex items-center justify-center border-b border-gray-200">
                {tabs.map((tab) => (
                    <Tabs.Trigger
                        key={tab.value}
                        value={tab.value}
                        className={cn(
                            'inline-flex items-center justify-center whitespace-nowrap px-4 pb-3 pt-3.5 text-base font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-b-4 border-transparent mb-[-2px]',
                            'data-[state=active]:text-brand-800 data-[state=active]:border-brand-700 data-[state=active]:bg-brand-50',
                            'data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700'
                        )}
                    >
                        {tab.label}
                    </Tabs.Trigger>
                ))}
            </Tabs.List>
        </Tabs.Root>
    );
};

export default ToggleTabs;
