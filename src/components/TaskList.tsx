import React from 'react';
import { Reorder, AnimatePresence } from 'framer-motion';
import { TaskItem } from './TaskItem';
import { EmptyState } from './EmptyState';
import { Task, FilterType } from '../types';
interface TaskListProps {
  tasks: Task[];
  filter: FilterType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onReorder: (newOrder: Task[]) => void;
}
export function TaskList({
  tasks,
  filter,
  onToggle,
  onDelete,
  onEdit,
  onReorder
}: TaskListProps) {
  if (tasks.length === 0) {
    return <EmptyState filter={filter} />;
  }
  return (
    <Reorder.Group
      axis="y"
      values={tasks}
      onReorder={onReorder}
      className="w-full">
      
      <AnimatePresence mode="popLayout">
        {tasks.map((task) =>
        <Reorder.Item
          key={task.id}
          value={task}
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
            scale: 0.9,
            transition: {
              duration: 0.2
            }
          }}>
          
            <TaskItem
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit} />
          
          </Reorder.Item>
        )}
      </AnimatePresence>
    </Reorder.Group>);

}