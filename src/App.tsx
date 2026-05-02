import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { TaskInput } from './components/TaskInput';
import { FilterTabs } from './components/FilterTabs';
import { TaskList } from './components/TaskList';
import { Task, FilterType } from './types';
export function App() {
  // State
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('taskmaster-tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
    {
      id: '1',
      text: 'Welcome to TaskMaster! 👋',
      completed: false,
      createdAt: Date.now()
    },
    {
      id: '2',
      text: 'Try dragging this task to reorder',
      completed: false,
      createdAt: Date.now() - 1000
    },
    {
      id: '3',
      text: 'Mark me as complete',
      completed: true,
      createdAt: Date.now() - 2000
    }];

  });
  const [filter, setFilter] = useState<FilterType>('all');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    }
    return true;
  });
  // Effects
  useEffect(() => {
    localStorage.setItem('taskmaster-tasks', JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  // Derived state
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter((t) => !t.completed);
      case 'completed':
        return tasks.filter((t) => t.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);
  const counts = useMemo(
    () => ({
      all: tasks.length,
      active: tasks.filter((t) => !t.completed).length,
      completed: tasks.filter((t) => t.completed).length
    }),
    [tasks]
  );
  const completionPercentage =
  tasks.length === 0 ? 0 : counts.completed / tasks.length * 100;
  // Handlers
  const handleAddTask = (text: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now()
    };
    setTasks([newTask, ...tasks]);
  };
  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((t) =>
      t.id === id ?
      {
        ...t,
        completed: !t.completed
      } :
      t
      )
    );
  };
  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };
  const handleEditTask = (id: string, newText: string) => {
    setTasks(
      tasks.map((t) =>
      t.id === id ?
      {
        ...t,
        text: newText
      } :
      t
      )
    );
  };
  const handleReorder = (newOrder: Task[]) => {
    // When filtered, we only reorder the visible ones, but we need to merge them back into the main list
    // For simplicity in this implementation, we only allow reordering when viewing 'all'
    if (filter === 'all') {
      setTasks(newOrder);
    }
  };
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex justify-center pt-12 pb-24 px-4 sm:px-6">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 dark:bg-accent/10 blur-[120px] animate-blob" />
        <div
          className="absolute top-[40%] right-[-10%] w-[30%] h-[30%] rounded-full bg-purple-500/20 dark:bg-purple-500/10 blur-[100px] animate-blob"
          style={{
            animationDelay: '2s'
          }} />
        
        <div
          className="absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] rounded-full bg-blue-500/20 dark:bg-blue-500/10 blur-[100px] animate-blob"
          style={{
            animationDelay: '4s'
          }} />
        
      </div>

      {/* Main Content */}
      <motion.main
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.5
        }}
        className="relative z-10 w-full max-w-2xl">
        
        <div className="bg-white/40 dark:bg-dark-bg/40 backdrop-blur-3xl border border-white/20 dark:border-white/5 shadow-2xl rounded-3xl p-6 sm:p-8">
          <Header
            completionPercentage={completionPercentage}
            isDarkMode={isDarkMode}
            toggleTheme={() => setIsDarkMode(!isDarkMode)} />
          

          <TaskInput onAdd={handleAddTask} />

          <FilterTabs filter={filter} setFilter={setFilter} counts={counts} />

          <div className="mt-6 min-h-[300px]">
            <TaskList
              tasks={filteredTasks}
              filter={filter}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
              onReorder={handleReorder} />
            
          </div>
        </div>

        <p className="text-center text-slate-400 dark:text-slate-500 text-sm mt-8 font-medium">
          Drag and drop to reorder tasks (in 'All' view)
        </p>
      </motion.main>
    </div>);

}