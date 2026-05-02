import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle, ListX } from 'lucide-react';
import { FilterType } from '../types';
interface EmptyStateProps {
  filter: FilterType;
}
export function EmptyState({ filter }: EmptyStateProps) {
  const content = {
    all: {
      icon: <Sparkles size={48} className="text-accent/50" />,
      title: 'No tasks yet',
      desc: 'Add a task above to get started on your goals.'
    },
    active: {
      icon: <CheckCircle size={48} className="text-emerald-500/50" />,
      title: 'All caught up!',
      desc: "You don't have any active tasks right now."
    },
    completed: {
      icon: <ListX size={48} className="text-slate-400/50" />,
      title: 'No completed tasks',
      desc: 'Tasks you complete will appear here.'
    }
  };
  const { icon, title, desc } = content[filter];
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      exit={{
        opacity: 0,
        y: -20
      }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center">
      
      <motion.div
        initial={{
          scale: 0.8
        }}
        animate={{
          scale: 1
        }}
        transition={{
          type: 'spring',
          bounce: 0.5
        }}
        className="mb-6 p-6 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10">
        
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
        {title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-xs">{desc}</p>
    </motion.div>);

}