import { Pause, Play, RotateCcw, Settings } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';

interface TimerProps {
  workMinutes: number;
  restMinutes: number;
  cycles: number;
  onSettingsClick: () => void;
}

type TimerPhase = 'work' | 'rest' | 'complete';

export function Timer({
  workMinutes,
  restMinutes,
  cycles,
  onSettingsClick,
}: TimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<TimerPhase>('work');
  const [currentCycle, setCurrentCycle] = useState(1);
  const [timeLeft, setTimeLeft] = useState(workMinutes * 60);
  const intervalRef = useRef<number | null>(null);

  const totalTime = phase === 'work' ? workMinutes * 60 : restMinutes * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  // Calculate cycle progress - fills after each rest period completes
  const completedCycles = phase === 'complete' ? cycles : currentCycle - 1;
  const cycleProgress = (completedCycles / cycles) * 100;

  useEffect(() => {
    // Reset when settings change
    handleReset();
  }, [workMinutes, restMinutes, cycles]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handlePhaseComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handlePhaseComplete = () => {
    // Play a beep sound (using Web Audio API)
    const audioContext = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5,
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);

    if (phase === 'work') {
      setPhase('rest');
      setTimeLeft(restMinutes * 60);
    }

    if (phase === 'rest') {
      if (currentCycle < cycles) {
        setCurrentCycle((prev) => prev + 1);
        setPhase('work');
        setTimeLeft(workMinutes * 60);
      } else {
        setPhase('complete');
        setIsRunning(false);
        setTimeLeft(0);
      }
    }
  };

  const handlePlayPause = () => {
    if (phase === 'complete') {
      handleReset();
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase('work');
    setCurrentCycle(1);
    setTimeLeft(workMinutes * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseColor = () => {
    if (phase === 'work') return 'text-blue-500';
    if (phase === 'rest') return 'text-green-500';
    return 'text-purple-500';
  };

  const getPhaseLabel = () => {
    if (phase === 'work') return 'Work Time';
    if (phase === 'rest') return 'Rest Time';
    return 'Complete!';
  };

  const getProgressColor = () => {
    if (phase === 'work') return 'bg-blue-500';
    if (phase === 'rest') return 'bg-green-500';
    return 'bg-purple-500';
  };

  const getCycleProgressColor = () => {
    return 'text-orange-500';
  };

  return (
    <View className="flex flex-col items-center justify-center gap-8 px-6 py-8 max-w-md mx-auto">
      {/* Phase Indicator */}
      <View className="text-center space-y-2">
        <h2 className={`text-xl font-semibold ${getPhaseColor()}`}>
          {getPhaseLabel()}
        </h2>
        <p className="text-sm text-muted-foreground ">
          Cycle {currentCycle} of {cycles}
        </p>
      </View>

      {/* Timer Display with Concentric Circles */}
      <View className="relative">
        <View className="size-64 rounded-full border-8 border-muted flex items-center justify-center">
          <span className="text-6xl font-bold tabular-nums ">
            {formatTime(timeLeft)}
          </span>
        </View>

        {/* Outer Cycle Progress Circle */}
        <svg
          className="absolute inset-0 size-64 -rotate-90"
          style={{
            transform: 'scale(1.04)',
            transformOrigin: 'center',
          }}
        >
          {/* Background circle for cycles */}
          <circle
            cx="128"
            cy="128"
            r="125"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-orange-500/20"
            strokeDasharray={`${2 * Math.PI * 125}`}
          />
          {/* Progress circle for cycles */}
          <circle
            cx="128"
            cy="128"
            r="125"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className={getCycleProgressColor()}
            strokeDasharray={`${2 * Math.PI * 125}`}
            strokeDashoffset={`${2 * Math.PI * 125 * (1 - cycleProgress / 100)}`}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.5s linear',
            }}
          />
        </svg>

        {/* Inner Timer Progress Circle */}
        <svg className="absolute inset-0 size-64 -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className={
              phase === 'work'
                ? 'text-blue-500/20'
                : phase === 'rest'
                  ? 'text-green-500/20'
                  : 'text-purple-500/20'
            }
            strokeDasharray={`${2 * Math.PI * 120}`}
          />
          <circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className={
              phase === 'work'
                ? 'text-blue-500'
                : phase === 'rest'
                  ? 'text-green-500'
                  : 'text-purple-500'
            }
            strokeDasharray={`${2 * Math.PI * 120}`}
            strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.5s linear',
            }}
          />
        </svg>
      </View>

      {/* Controls */}
      <View className="flex flex-row">
        <Pressable
          onPress={handlePlayPause}
          className="rounded-full size-16 items-center justify-center"
          disabled={phase === 'complete' && timeLeft === 0}
        >
          {isRunning ? <Pause /> : <Play className="size-6" />}
        </Pressable>
        <Pressable
          onPress={handleReset}
          className="rounded-full size-16 items-center justify-center"
        >
          <RotateCcw />
        </Pressable>
        <Pressable
          onPress={onSettingsClick}
          className="rounded-full size-16 items-center justify-center"
        >
          <Settings />
        </Pressable>
      </View>
    </View>
  );
}
