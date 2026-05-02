import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, CheckCircle2 } from 'lucide-react';
interface HeaderProps {
  completionPercentage: number;
  isDarkMode: boolean;
  toggleTheme: () => void;
}
export function Header({
  completionPercentage,
  isDarkMode,
  toggleTheme
}: HeaderProps) {
  return (
    <header className="w-full mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/10 dark:bg-accent/20 rounded-xl text-accent">
            <CheckCircle2 size={28} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              TaskMaster
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Organize your day, achieve your goals.
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={toggleTheme}
          className="p-2.5 rounded-full bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-md text-slate-600 dark:text-slate-300 hover:text-accent dark:hover:text-accent transition-colors"
          aria-label="Toggle theme">
          
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-slate-600 dark:text-slate-300">
            Daily Progress
          </span>
          <span className="text-accent">
            {Math.round(completionPercentage)}%
          </span>
        </div>
        <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent"
            initial={{
              width: 0
            }}
            animate={{
              width: `${completionPercentage}%`
            }}
            transition={{
              duration: 0.5,
              ease: 'easeOut'
            }} />
          
        </div>
      </div>
    </header>);

}