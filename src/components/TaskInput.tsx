import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ListTodo } from 'lucide-react';
interface TaskInputProps {
  onAdd: (text: string) => void;
}
export function TaskInput({ onAdd }: TaskInputProps) {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };
  return (
    <form onSubmit={handleSubmit} className="relative w-full mb-8 group">
      <motion.div
        animate={{
          boxShadow: isFocused ?
          '0 0 0 2px rgba(99, 102, 241, 0.5), 0 4px 20px -2px rgba(99, 102, 241, 0.2)' :
          '0 2px 10px -2px rgba(0, 0, 0, 0.05)',
          borderColor: isFocused ? 'rgba(99, 102, 241, 0.5)' : 'transparent'
        }}
        className="relative flex items-center w-full bg-white/70 dark:bg-dark-card/60 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden transition-colors">
        
        <div className="pl-4 text-slate-400 dark:text-slate-500">
          <ListTodo size={20} />
        </div>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="What needs to be done?"
          className="w-full py-4 px-3 bg-transparent border-none outline-none text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 font-medium" />
        

        <div className="pr-2">
          <motion.button
            type="submit"
            disabled={!text.trim()}
            whileHover={
            text.trim() ?
            {
              scale: 1.05
            } :
            {}
            }
            whileTap={
            text.trim() ?
            {
              scale: 0.95
            } :
            {}
            }
            className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${text.trim() ? 'bg-accent text-white shadow-lg shadow-accent/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'}`}>
            
            <Plus size={20} strokeWidth={2.5} />
          </motion.button>
        </div>
      </motion.div>
    </form>);

}