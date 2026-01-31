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
    return 'rgb(255, 42, 0)'; // orange-500
  };

  const getStrokeColor = (opacity: boolean = false) => {
    const colors = {
      work: opacity ? 'rgba(51, 255, 102, 0.2)' : 'rgb(51, 255, 102)', // blue-500
      rest: opacity ? 'rgba(204, 255, 51, 0.2)' : 'rgb(204, 255, 51)', // green-500
      complete: opacity ? 'rgba(204, 51, 255, 0.2)' : 'rgb(204, 51, 255)', // purple-500
    };
    return colors[phase];
  };

  return (
    <View className="flex flex-col items-center justify-center gap-8 px-6 py-8 max-w-md mx-auto">
      {/* Phase Indicator */}
      <View className="flex flex-col items-center">
        <Text className={`text-3xl font-semibold ${getPhaseColor()}`}>
          {getPhaseLabel()}
        </Text>
        <Text className="text-sm text-cyan-50 text-muted-foreground ">
          Cycle {currentCycle} of {cycles}
        </Text>
      </View>

      {/* Timer Display with Concentric Circles */}
      <View className="relative w-72 h-72">
        {/* Timer Display with Text - Background Circle */}
        <View className="absolute inset-0 rounded-full flex items-center justify-center">
          <Text className="text-7xl font-extralight text-white">
            {formatTime(timeLeft)}
          </Text>
        </View>

        <View className="absolute inset-0 flex items-center justify-center">
          {/* SVG Progress Circles - Overlaid on top */}
          <Svg
            width={288}
            height={288}
            viewBox="0 0 288 288"
            transform="rotate(-90)"
          >
            {/* Background circle for timer */}
            <Circle
              cx="144"
              cy="144"
              r="100"
              fill="none"
              stroke={getStrokeColor(true)}
              strokeWidth="18"
              strokeDasharray={`${2 * Math.PI * 100}`}
            />
            {/* Progress circle for timer */}
            <Circle
              cx="144"
              cy="144"
              r="100"
              fill="none"
              stroke={getStrokeColor(false)}
              strokeWidth="18"
              strokeDasharray={`${2 * Math.PI * 100}`}
              strokeDashoffset={`${2 * Math.PI * 100 * (1 - progress / 100)}`}
              strokeLinecap="round"
            />
            {/* Background circle for cycles */}
            <Circle
              cx="144"
              cy="144"
              r="118"
              fill="none"
              stroke="rgba(234, 179, 8, 0.2)"
              strokeWidth="18"
              strokeDasharray={`${2 * Math.PI * 118}`}
            />
            {/* Progress circle for cycles */}
            <Circle
              cx="144"
              cy="144"
              r="118"
              fill="none"
              stroke="rgb(234, 179, 8)"
              strokeWidth="18"
              strokeDasharray={`${2 * Math.PI * 118}`}
              strokeDashoffset={`${2 * Math.PI * 118 * (1 - cycleProgress / 100)}`}
              strokeLinecap="round"
            />
          </Svg>
        </View>
      </View>

      {/* Controls */}
      <View className="flex flex-row ">
        <Pressable
          onPress={handlePlayPause}
          className="rounded-full size-16 items-center justify-center"
          disabled={phase === 'complete' && timeLeft === 0}
        >
          {isRunning ? (
            <Pause color="#FFFFFF" />
          ) : (
            <Play color="#FFFFFF" className="size-6 " />
          )}
        </Pressable>
        <Pressable
          onPress={handleReset}
          className="rounded-full size-16 items-center justify-center"
        >
          <RotateCcw color="#FFFFFF" />
        </Pressable>
        <Pressable
          onPress={onSettingsClick}
          className="rounded-full size-16 items-center justify-center"
        >
          <Settings color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}
