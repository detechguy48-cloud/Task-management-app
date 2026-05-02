import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2, Edit2, GripVertical, X } from 'lucide-react';
import { Task } from '../types';
interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}
export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  const handleSave = () => {
    if (editText.trim() && editText !== task.text) {
      onEdit(task.id, editText.trim());
    } else {
      setEditText(task.text);
    }
    setIsEditing(false);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };
  return (
    <motion.div
      layout
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
        scale: 0.95,
        transition: {
          duration: 0.2
        }
      }}
      whileHover={{
        scale: 1.01
      }}
      className="group relative flex items-center gap-3 p-4 mb-3 bg-white/60 dark:bg-dark-card/60 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-2xl shadow-sm hover:shadow-md transition-all">
      
      <div className="cursor-grab active:cursor-grabbing text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical size={18} />
      </div>

      <button
        onClick={() => onToggle(task.id)}
        className={`relative flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${task.completed ? 'bg-accent border-accent' : 'border-slate-300 dark:border-slate-600 hover:border-accent dark:hover:border-accent'}`}>
        
        <motion.div
          initial={false}
          animate={{
            scale: task.completed ? 1 : 0,
            opacity: task.completed ? 1 : 0
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30
          }}>
          
          <Check size={14} className="text-white" strokeWidth={3} />
        </motion.div>
      </button>

      <div className="flex-1 min-w-0">
        {isEditing ?
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent border-b-2 border-accent outline-none text-slate-800 dark:text-slate-200 font-medium py-1" /> :


        <span
          className={`block truncate font-medium transition-all duration-300 ${task.completed ? 'text-slate-400 dark:text-slate-500 line-through decoration-slate-400/50 dark:decoration-slate-500/50' : 'text-slate-700 dark:text-slate-200'}`}>
          
            {task.text}
          </span>
        }
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {isEditing ?
        <button
          onClick={() => setIsEditing(false)}
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
          
            <X size={18} />
          </button> :

        <button
          onClick={() => setIsEditing(true)}
          className="p-2 text-slate-400 hover:text-accent transition-colors">
          
            <Edit2 size={18} />
          </button>
        }
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 text-slate-400 hover:text-red-500 transition-colors">
          
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>);

}