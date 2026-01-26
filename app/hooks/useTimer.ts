import { TIMER_CONSTANTS } from '@/app/constants/TimerConstants';
import { useCallback, useEffect, useState } from 'react';

export type TimerPhase = 'work' | 'rest';

export const useTimer = (
  initialSeconds: number = 0,
  maxDuration?: number,
  restDuration?: number,
) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<TimerPhase>('work');

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        const nextSeconds = prev + 1;

        // If work phase ends, switch to rest phase
        if (phase === 'work' && maxDuration && nextSeconds >= maxDuration) {
          setPhase('rest');
          return 0;
        }

        // If rest phase ends, switch back to work phase
        if (phase === 'rest' && restDuration && nextSeconds >= restDuration) {
          setPhase('work');
          return 0;
        }

        return nextSeconds;
      });
    }, TIMER_CONSTANTS.INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isActive, maxDuration, restDuration, phase]);

  const toggleTimer = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setSeconds(0);
    setIsActive(false);
    setPhase('work');
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
    phase,
  };
};
