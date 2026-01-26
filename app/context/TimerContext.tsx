import React, { createContext, useCallback, useState } from 'react';

export interface TimerSettings {
  cycles: number;
  workTime: number; // in minutes
  restTime: number; // in minutes
}

export const DEFAULT_TIMER_SETTINGS: TimerSettings = {
  cycles: 4,
  workTime: 25,
  restTime: 5,
};

interface TimerContextType {
  settings: TimerSettings;
  updateSettings: (settings: TimerSettings) => void;
}

export const TimerContext = createContext<TimerContextType | undefined>(
  undefined,
);

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<TimerSettings>(
    DEFAULT_TIMER_SETTINGS,
  );

  const updateSettings = useCallback((newSettings: TimerSettings) => {
    setSettings(newSettings);
  }, []);

  return (
    <TimerContext.Provider value={{ settings, updateSettings }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimerSettings() {
  const context = React.useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimerSettings must be used within TimerProvider');
  }
  return context;
}
