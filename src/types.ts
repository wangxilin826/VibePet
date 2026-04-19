export type TaskType = 'todo' | 'note';

export interface Task {
  id: string;
  content: string;
  type: TaskType;
  completed: boolean;
  pinned: boolean;
  createdAt: number;
  startTime?: string;
  endTime?: string;
}

export enum PetState {
  IDLE = 'IDLE',
  ACTIVE = 'ACTIVE',
  REWARD = 'REWARD',
}

export type TabView = 'all' | 'todo' | 'note';
