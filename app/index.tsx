import { useTimer } from '@/app/hooks/useTimer';
import { globalStyles } from '@/styles/global-styles';
import { useMemo } from 'react';
import { Button, Pressable, Text, View } from 'react-native';
import AppHeader from './components/header/AppHeader';

import './global.css';

export default function Index() {
  const { seconds, isActive, toggleTimer, resetTimer, formatTime } =
    useTimer(0);

  const displayTime = useMemo(() => formatTime(seconds), [seconds, formatTime]);

  return (
    <View style={globalStyles.appContainer}>
      <AppHeader />
      <Text style={globalStyles.timer}>{displayTime}</Text>
      <Pressable onPress={toggleTimer}>
        <Text
          style={{
            color: 'white',
            fontSize: 24,
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          {isActive ? 'Pause' : 'Start'}
        </Text>
      </Pressable>
      <Button title="Reset" onPress={resetTimer} />
    </View>
  );
}
