import React, { useState, useEffect, useRef } from 'react';
import { PetVisuals } from './components/PetVisuals';
import { TaskPanel } from './components/TaskPanel';
import { ReviewModal } from './components/ReviewModal';
import { Task, PetState, TaskType } from './types';
import { playCoinSound } from './utils/sound';
import { nanoid } from 'nanoid';

const INITIAL_TASKS: Task[] = [];

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [petState, setPetState] = useState<PetState>(PetState.IDLE);

  const [position, setPosition] = useState(() => {
    const startX = window.innerWidth > 500 ? window.innerWidth - 400 : window.innerWidth / 2 - 60;
    return { x: Math.max(20, startX), y: 100 };
  });

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [reviewSummary, setReviewSummary] = useState('');
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const isReviewOpenRef = useRef(isReviewOpen);
  const [contextMenu, setContextMenu] = useState<{ visible: boolean; x: number; y: number } | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showPanelOnLeft = (windowWidth - position.x) < 450;

  useEffect(() => {
    isReviewOpenRef.current = isReviewOpen;
  }, [isReviewOpen]);

  // Dragging Logic
  const dragRef = useRef<{ isDragging: boolean; startX: number; startY: number; initialLeft: number; initialTop: number }>({
    isDragging: false,
    startX: 0,
    startY: 0,
    initialLeft: 0,
    initialTop: 0,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 2) return;
    if ((e.target as HTMLElement).closest('.pet-visual-area')) {
        dragRef.current = {
        isDragging: true,
        startX: e.clientX,
        startY: e.clientY,
        initialLeft: position.x,
        initialTop: position.y,
        };
        setContextMenu(null);
        e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragRef.current.isDragging) {
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      setPosition({
        x: dragRef.current.initialLeft + dx,
        y: dragRef.current.initialTop + dy,
      });
    }
  };

  const handleMouseUp = () => {
    dragRef.current.isDragging = false;
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
        visible: true,
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY
    });
  };

  const handleMouseEnterPet = () => {
    if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
    }
    if (!dragRef.current.isDragging) {
        setPetState(PetState.ACTIVE);
        setIsPanelOpen(true);
    }
  };

  const handleMouseLeavePet = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
        if (contextMenu?.visible || isReviewOpenRef.current) return;
        setIsPanelOpen(false);
        setPetState(PetState.IDLE);
    }, 150);
  };

  const handleDesktopClick = (e: React.MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.pet-container')) {
          if (!isReviewOpen) {
            setIsPanelOpen(false);
            setPetState(PetState.IDLE);
            setContextMenu(null);
          }
      } else {
          if (!(e.target as HTMLElement).closest('.context-menu')) {
            setContextMenu(null);
          }
      }
  };

  // --- Task Operations ---

  const addTask = (content: string, type: TaskType, startTime?: string) => {
    const newTask: Task = {
      id: nanoid(),
      content,
      type,
      completed: false,
      pinned: false,
      createdAt: Date.now(),
      startTime
    };
    setTasks(prev => [newTask, ...prev]);
    setPetState(PetState.ACTIVE);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const newState = !t.completed;
        if (newState) {
          playCoinSound();
          setPetState(PetState.REWARD);
          setTimeout(() => setPetState(PetState.ACTIVE), 2500);
        }
        return { ...t, completed: newState };
      }
      return t;
    }));
  };

  const pinTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, pinned: !t.pinned } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const editTask = (id: string, newContent: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, content: newContent } : t));
  };

  // --- Review Logic ---

  const handleReviewDay = () => {
    const dateStr = new Date().toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
    const completed = tasks.filter(t => t.completed);
    const incomplete = tasks.filter(t => !t.completed);

    let summary = `【${dateStr} 工作总结】\n`;
    completed.forEach(t => {
      summary += `【完成】 ${t.content}\n`;
    });
    incomplete.forEach(t => {
        if(t.type === 'note') {
            summary += `【记录】 ${t.content}\n`;
        } else {
             summary += `【待办】 ${t.content} (自动顺延)\n`;
        }
    });

    setReviewSummary(summary);
    setIsReviewOpen(true);
    setTasks(prev => prev.filter(t => !t.completed));
  };

  return (
    <div
        className="w-screen h-screen relative cursor-default bg-gradient-to-br from-slate-100 to-indigo-100"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseDown={handleDesktopClick}
    >
      {/* Pet Container */}
      <div
        className="pet-container absolute z-40 transition-none pointer-events-auto"
        style={{ left: position.x, top: position.y }}
        onMouseEnter={handleMouseEnterPet}
        onMouseLeave={handleMouseLeavePet}
      >
        <div className="relative">
            {/* The Pet */}
            <div
                className="pet-visual-area relative cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onContextMenu={handleContextMenu}
            >
                {/* Pinned "Thought Bubbles" */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex flex-col-reverse gap-2 w-48 pointer-events-none">
                    {tasks.filter(t => t.pinned && !t.completed).map(task => (
                        <div
                            key={task.id}
                            className="bg-white border border-gray-200 rounded-xl rounded-bl-none p-2 shadow-sm text-xs text-gray-700 animate-fade-in-up pointer-events-auto select-text cursor-text"
                            onMouseDown={(e) => e.stopPropagation()}
                        >
                            <div className="font-bold text-[10px] text-blue-500 mb-0.5 select-none">置顶</div>
                            {task.content}
                        </div>
                    ))}
                </div>

                <PetVisuals state={petState} />

                {/* Context Menu (Right Click) */}
                {contextMenu?.visible && (
                    <div
                        className="context-menu absolute bg-white/90 backdrop-blur rounded-lg shadow-xl border border-gray-200 p-1 w-32 z-50 animate-fade-in"
                        style={{
                            left: contextMenu.x + 10,
                            top: contextMenu.y + 10
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setContextMenu(null)}
                            className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded flex items-center gap-2 transition-colors"
                        >
                            关于 VibePet
                        </button>
                    </div>
                )}
            </div>

            {/* Task Panel (Popout) */}
            {isPanelOpen && !contextMenu?.visible && (
            <div
                className={`absolute top-0 w-max animate-fade-in ${
                    showPanelOnLeft
                    ? 'right-full mr-4 origin-top-right'
                    : 'left-full ml-4 origin-top-left'
                }`}
            >
                <TaskPanel
                tasks={tasks}
                onAddTask={addTask}
                onToggleTask={toggleTask}
                onPinTask={pinTask}
                onDeleteTask={deleteTask}
                onEditTask={editTask}
                onReviewDay={handleReviewDay}
                />
            </div>
            )}
        </div>
      </div>

      {/* Review Modal */}
      {isReviewOpen && (
        <div className="fixed inset-0 z-50 pointer-events-auto">
            <ReviewModal
                isOpen={isReviewOpen}
                onClose={() => setIsReviewOpen(false)}
                summary={reviewSummary}
            />
        </div>
      )}
    </div>
  );
};

export default App;
