import { useTimer } from '@/app/hooks/useTimer';
import { globalStyles } from '@/styles/global-styles';
import { useMemo } from 'react';
import { Button, Pressable, Text, View } from 'react-native';
import AppHeader from './components/header/AppHeader';
import CircularProgress from './components/timer/CircularProgress';

import './global.css';

const POMODORO_DURATION = 0.5 * 60; // 25 minutes in seconds

export default function Index() {
  const { seconds, isActive, toggleTimer, resetTimer, formatTime } = useTimer(
    0,
    POMODORO_DURATION,
  );

  const displayTime = useMemo(() => formatTime(seconds), [seconds, formatTime]);

  const progress = useMemo(() => {
    return Math.min(seconds / POMODORO_DURATION, 1);
  }, [seconds]);

  return (
    <View style={globalStyles.appContainer}>
      <AppHeader />

      <CircularProgress
        progress={progress}
        size={300}
        strokeWidth={8}
        backgroundColor="#333"
        progressColor="#4CAF50"
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
