import { useEffect, useState, useCallback } from 'react';
import { TIMER_CONSTANTS } from '@/app/constants/TimerConstants';

export const useTimer = (initialSeconds: number = 0) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, TIMER_CONSTANTS.INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isActive]);

  const toggleTimer = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setSeconds(0);
    setIsActive(false);
  }, []);

  const formatTime = useCallback((totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / TIMER_CONSTANTS.SECONDS_PER_MINUTE);
    const secs = totalSeconds % TIMER_CONSTANTS.SECONDS_PER_MINUTE;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return {
    seconds,
    isActive,
    toggleTimer,
    resetTimer,
    formatTime,
  };
};
