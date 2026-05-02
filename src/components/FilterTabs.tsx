import React from 'react';
import { motion } from 'framer-motion';
import { FilterType } from '../types';
interface FilterTabsProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  counts: Record<FilterType, number>;
}
export function FilterTabs({ filter, setFilter, counts }: FilterTabsProps) {
  const tabs: {
    id: FilterType;
    label: string;
  }[] = [
  {
    id: 'all',
    label: 'All Tasks'
  },
  {
    id: 'active',
    label: 'Active'
  },
  {
    id: 'completed',
    label: 'Completed'
  }];

  return (
    <div className="flex space-x-1 bg-slate-200/50 dark:bg-white/5 backdrop-blur-md p-1 rounded-xl mb-6 border border-slate-200 dark:border-white/5">
      {tabs.map((tab) => {
        const isActive = filter === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`relative flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-colors z-10 ${isActive ? 'text-white dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}>
            
            {isActive &&
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-accent rounded-lg -z-10 shadow-sm"
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30
              }} />

            }
            <div className="flex items-center justify-center gap-2">
              <span>{tab.label}</span>
              <span
                className={`text-xs py-0.5 px-2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-300/50 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                
                {counts[tab.id]}
              </span>
            </div>
          </button>);

      })}
    </div>);

}