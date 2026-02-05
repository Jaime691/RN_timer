import { create } from 'zustand';

interface TimerState {
  workMinutes: number;
  restMinutes: number;
  cycles: number;
  updateSettings: (
    workMinutes: number,
    restMinutes: number,
    cycles: number,
  ) => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  workMinutes: 1,
  restMinutes: 1,
  cycles: 2,
  updateSettings: (workMinutes, restMinutes, cycles) =>
    set({ workMinutes, restMinutes, cycles }),
}));
