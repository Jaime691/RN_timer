import { TIMER_CONSTANTS } from '@/app/constants/TimerConstants';
import { useTimerSettings } from '@/app/context/TimerContext';
import { useTimer } from '@/app/hooks/useTimer';
import { globalStyles } from '@/styles/global-styles';
import { useMemo, useState } from 'react';
import { Button, Pressable, Text, View } from 'react-native';
import AppHeader from './components/header/AppHeader';
import SettingsScreen from './components/settings/SettingsScreen';
import CircularProgress from './components/timer/CircularProgress';

import './global.css';

export default function Index() {
  const [showSettings, setShowSettings] = useState(false);
  const { settings } = useTimerSettings();

  const workDurationSeconds =
    settings.workTime * TIMER_CONSTANTS.SECONDS_PER_MINUTE;
  const restDurationSeconds =
    settings.restTime * TIMER_CONSTANTS.SECONDS_PER_MINUTE;

  const { seconds, isActive, toggleTimer, resetTimer, formatTime, phase } =
    useTimer(0, workDurationSeconds, restDurationSeconds);

  const displayTime = useMemo(() => formatTime(seconds), [seconds, formatTime]);

  const currentDuration =
    phase === 'work' ? workDurationSeconds : restDurationSeconds;

  const progress = useMemo(() => {
    return currentDuration > 0 ? Math.min(seconds / currentDuration, 1) : 0;
  }, [seconds, currentDuration]);

  const progressColor = phase === 'work' ? '#4CAF50' : '#FF9800'; // Green for work, Orange for rest

  if (showSettings) {
    return <SettingsScreen onClose={() => setShowSettings(false)} />;
  }

  return (
    <View style={globalStyles.appContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          marginBottom: 16,
        }}
      >
        <AppHeader />
        <Pressable onPress={() => setShowSettings(true)}>
          <Text style={{ color: 'white', fontSize: 24 }}>⚙️</Text>
        </Pressable>
      </View>

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
