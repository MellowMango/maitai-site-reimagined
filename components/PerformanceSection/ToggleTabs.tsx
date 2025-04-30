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
            <Tabs.List className="inline-flex items-center justify-center rounded-full bg-gray-100 p-1">
                {tabs.map((tab) => (
                    <Tabs.Trigger
                        key={tab.value}
                        value={tab.value}
                        className={cn(
                            'inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2 text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                            'data-[state=active]:bg-brand-900 data-[state=active]:text-gray-800 data-[state=active]:shadow-sm data-[state=active]:hover:bg-brand-900',
                            'data-[state=inactive]:text-gray-800 data-[state=inactive]:hover:bg-gray-200/70'
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
