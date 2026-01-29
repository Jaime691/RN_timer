import { Pause, Play, RotateCcw, Settings } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface TimerProps {
  workMinutes: number;
  restMinutes: number;
  cycles: number;
  onSettingsClick: () => void;
}

type TimerPhase = 'work' | 'rest' | 'complete';

export default function Timer({
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

  const getCycleProgressStroke = () => {
    return 'rgb(255, 95, 31)'; // orange-500
  };

  const getStrokeColor = (opacity: boolean = false) => {
    const colors = {
      work: opacity ? 'rgba(59, 130, 246, 0.2)' : 'rgb(59, 130, 246)', // blue-500
      rest: opacity ? 'rgba(34, 197, 94, 0.2)' : 'rgb(34, 197, 94)', // green-500
      complete: opacity ? 'rgba(168, 85, 247, 0.2)' : 'rgb(168, 85, 247)', // purple-500
    };
    return colors[phase];
  };

  return (
    <View className="flex flex-col items-center justify-center gap-8 px-6 py-8 max-w-md mx-auto">
      {/* Phase Indicator */}
      <View className="text-center space-y-2">
        <Text className={`text-xl font-semibold ${getPhaseColor()}`}>
          {getPhaseLabel()}
        </Text>
        <Text className="text-sm text-muted-foreground ">
          Cycle {currentCycle} of {cycles}
        </Text>
      </View>

      {/* Timer Display with Concentric Circles */}
      <View className="relative w-72 h-72">
        {/* Timer Display with Text - Background Circle */}
        <View className="fixed top-28 inset-0 rounded-full border-6 border-muted flex items-center justify-center">
          <Text className="text-6xl font-bold tabular-nums">
            {formatTime(timeLeft)}
          </Text>
        </View>

        {/* SVG Progress Circles - Overlaid on top */}
        <Svg
          width={256}
          height={256}
          viewBox="0 0 256 256"
          transform="rotate(-90 128 128)"
          style={{ position: 'absolute', inset: 0 }}
        >
          {/* Background circle for timer */}
          <Circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke={getStrokeColor(true)}
            strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 120}`}
          />
          {/* Progress circle for timer */}
          <Circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke={getStrokeColor(false)}
            strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 120}`}
            strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
            strokeLinecap="round"
          />
          {/* Background circle for cycles */}
          <Circle
            cx="128"
            cy="128"
            r="125"
            fill="none"
            stroke="rgba(234, 179, 8, 0.2)"
            strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 125}`}
          />
          {/* Progress circle for cycles */}
          <Circle
            cx="128"
            cy="128"
            r="125"
            fill="none"
            stroke="rgb(234, 179, 8)"
            strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 125}`}
            strokeDashoffset={`${2 * Math.PI * 125 * (1 - cycleProgress / 100)}`}
            strokeLinecap="round"
          />
        </Svg>
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
