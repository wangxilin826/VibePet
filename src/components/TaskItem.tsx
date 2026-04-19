import React, { useState } from 'react';
import { Task } from '../types';
import { Check, Pin, Edit2, Trash2, Clock, StickyNote } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onPin: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newContent: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onPin, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.content);

  const handleSave = () => {
    if (editValue.trim()) {
      onEdit(task.id, editValue);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
  };

  return (
    <div className={`group flex items-start gap-3 p-3 mb-2 rounded-xl border transition-all duration-200 ${
      task.completed
        ? 'bg-gray-50/80 border-gray-100 opacity-75'
        : 'bg-white border-gray-200 shadow-sm hover:shadow-md'
    }`}>
      <button
        onClick={() => onToggle(task.id)}
        className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
          task.completed
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 hover:border-blue-400'
        }`}
      >
        {task.completed && <Check size={12} className="text-white" />}
      </button>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            autoFocus
            type="text"
            className="w-full bg-gray-50 border border-blue-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <div>
            <div className={`text-sm break-words ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
              {task.content}
            </div>
            <div className="flex gap-2 mt-1">
              {task.type === 'note' && (
                <span className="inline-flex items-center text-[10px] text-gray-500 bg-yellow-50 px-1.5 py-0.5 rounded">
                  <StickyNote size={8} className="mr-1" /> 笔记
                </span>
              )}
              {task.startTime && (
                <span className="inline-flex items-center text-[10px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">
                  <Clock size={8} className="mr-1" /> {task.startTime}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <button
          onClick={() => onPin(task.id)}
          className={`p-1 rounded hover:bg-gray-100 ${task.pinned ? 'text-blue-500' : 'text-gray-400'}`}
          title="置顶到宠物头顶"
        >
          <Pin size={14} fill={task.pinned ? "currentColor" : "none"} />
        </button>
        <button
          onClick={() => setIsEditing(true)}
          className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600"
        >
          <Edit2 size={14} />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};
