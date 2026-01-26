import { TIMER_CONSTANTS } from '@/app/constants/TimerConstants';
import { useTimer } from '@/app/hooks/useTimer';
import { globalStyles } from '@/styles/global-styles';
import { useMemo } from 'react';
import { Button, Pressable, Text, View } from 'react-native';
import AppHeader from './components/header/AppHeader';
import CircularProgress from './components/timer/CircularProgress';

import './global.css';

export default function Index() {
  const { seconds, isActive, toggleTimer, resetTimer, formatTime, phase } =
    useTimer(
      0,
      TIMER_CONSTANTS.POMODORO_DURATION,
      TIMER_CONSTANTS.REST_DURATION,
    );

  const displayTime = useMemo(() => formatTime(seconds), [seconds, formatTime]);

  const currentDuration =
    phase === 'work'
      ? TIMER_CONSTANTS.POMODORO_DURATION
      : TIMER_CONSTANTS.REST_DURATION;

  const progress = useMemo(() => {
    return Math.min(seconds / currentDuration, 1);
  }, [seconds, currentDuration]);

  const progressColor = phase === 'work' ? '#4CAF50' : '#FF9800'; // Green for work, Orange for rest

  return (
    <View style={globalStyles.appContainer}>
      <AppHeader />

      <Text
        style={{
          color: phase === 'work' ? '#4CAF50' : '#FF9800',
          fontSize: 18,
          textAlign: 'center',
          marginBottom: 20,
          fontWeight: '600',
        }}
      >
        {phase === 'work' ? 'Work Time' : 'Rest Time'}
      </Text>

      <CircularProgress
        progress={progress}
        size={300}
        strokeWidth={8}
        backgroundColor="#333"
        progressColor={progressColor}
      >
        <Text style={globalStyles.timer}>{displayTime}</Text>
      </CircularProgress>

      <Pressable onPress={toggleTimer}>
        <Text
          style={{
            color: 'white',
            fontSize: 24,
            textAlign: 'center',
            marginBottom: 20,
            marginTop: 40,
          }}
        >
          {isActive ? 'Pause' : 'Start'}
        </Text>
      </Pressable>
      <Button title="Reset" onPress={resetTimer} />
    </View>
  );
}
