import React, { useState } from 'react';
import { Task, TabView, TaskType } from '../types';
import { TaskItem } from './TaskItem';
import { Plus, List, CheckSquare, StickyNote, Moon } from 'lucide-react';

interface TaskPanelProps {
  tasks: Task[];
  onAddTask: (content: string, type: TaskType, startTime?: string) => void;
  onToggleTask: (id: string) => void;
  onPinTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, newContent: string) => void;
  onReviewDay: () => void;
}

export const TaskPanel: React.FC<TaskPanelProps> = ({
  tasks,
  onAddTask,
  onToggleTask,
  onPinTask,
  onDeleteTask,
  onEditTask,
  onReviewDay
}) => {
  const [activeTab, setActiveTab] = useState<TabView>('all');
  const [inputValue, setInputValue] = useState('');
  const [inputTime, setInputTime] = useState('');
  const [inputType, setInputType] = useState<TaskType>('todo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAddTask(inputValue, inputType, inputTime || undefined);
    setInputValue('');
    setInputTime('');
  };

  const filteredTasks = tasks.filter(t => {
    if (activeTab === 'all') return true;
    if (activeTab === 'todo') return t.type === 'todo';
    if (activeTab === 'note') return t.type === 'note';
    return true;
  }).sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return b.createdAt - a.createdAt;
  });

  return (
    <div className="w-80 h-96 flex flex-col bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden transform transition-all duration-300">
      {/* Header / Tabs */}
      <div className="flex p-2 bg-gray-50/50 border-b border-gray-100">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-2 text-xs font-medium rounded-lg flex items-center justify-center gap-1 transition-colors ${activeTab === 'all' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          <List size={14} /> 全部
        </button>
        <button
          onClick={() => setActiveTab('todo')}
          className={`flex-1 py-2 text-xs font-medium rounded-lg flex items-center justify-center gap-1 transition-colors ${activeTab === 'todo' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          <CheckSquare size={14} /> 待办
        </button>
        <button
          onClick={() => setActiveTab('note')}
          className={`flex-1 py-2 text-xs font-medium rounded-lg flex items-center justify-center gap-1 transition-colors ${activeTab === 'note' ? 'bg-white shadow text-yellow-600' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          <StickyNote size={14} /> 笔记
        </button>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
        {filteredTasks.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm">
            <span className="mb-2 text-2xl">🍃</span>
            <p>这里空空如也</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onPin={onPinTask}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
            />
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-100">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex gap-2">
             <input
              type="text"
              placeholder="要做点什么？"
              className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="bg-black text-white rounded-lg p-2 hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>

          <div className="flex items-center justify-between">
             <div className="flex gap-2">
                <select
                    value={inputType}
                    onChange={(e) => setInputType(e.target.value as TaskType)}
                    className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1 text-gray-600 focus:outline-none"
                >
                    <option value="todo">任务</option>
                    <option value="note">笔记</option>
                </select>
                <input
                    type="time"
                    value={inputTime}
                    onChange={(e) => setInputTime(e.target.value)}
                    className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1 text-gray-600 focus:outline-none"
                />
             </div>

             <button
                type="button"
                onClick={onReviewDay}
                className="text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-1"
             >
                <Moon size={10} /> 下班打卡
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};
