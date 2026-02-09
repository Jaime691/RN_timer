import { create } from 'zustand';

interface Timer {
  name: string;
  workMinutes: number;
  restMinutes: number;
  cycles: number;
  id: string;
  createdAt: number;
}

interface TimerStore {
  timers: Timer[];
  addTimer: (timer: Omit<Timer, 'id' | 'createdAt'>) => void;
  removeTimer: (id: string) => void;
  updateTimer: (id: string, updates: Partial<Timer>) => void;
  getTimer: (id: string) => Timer | undefined;
  clearAllTimers: () => void;
  currentTimerId: string | null;
  setCurrentTimer: (id: string | null) => void;
  getCurrentTimer: () => Timer | undefined;
}

export const useTimerStore = create<TimerStore>((set, get) => ({
  timers: [
    {
      id: '1',
      createdAt: Date.now(),
      name: 'First Timer',
      workMinutes: 1,
      restMinutes: 1,
      cycles: 4,
    },
    {
      id: '2',
      createdAt: Date.now(),
      name: 'Second Timer',
      workMinutes: 25,
      restMinutes: 5,
      cycles: 3,
    },
  ],
  addTimer: (timer) =>
    set((state) => ({
      timers: [
        ...state.timers,
        { ...timer, id: crypto.randomUUID(), createdAt: Date.now() },
      ],
    })),
  removeTimer: (id) =>
    set((state) => ({
      timers: state.timers.filter((timer) => timer.id !== id),
    })),
  updateTimer: (id, updates) =>
    set((state) => ({
      timers: state.timers.map((timer) =>
        timer.id === id ? { ...timer, ...updates } : timer,
      ),
    })),
  getTimer: (id) => get().timers.find((timer) => timer.id === id),
  clearAllTimers: () => set({ timers: [] }),
  currentTimerId: null,
  setCurrentTimer: (id) => set({ currentTimerId: id }),
  getCurrentTimer: () =>
    get().timers.find((timer) => timer.id === get().currentTimerId),
}));
