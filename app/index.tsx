import { useState } from 'react';
import { Text, View } from 'react-native';
import Timer from './components/Timer';
import TimerSettings from './components/TimerSettings';
import './global.css';

function AppContent() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(1);
  const [restMinutes, setRestMinutes] = useState(1);
  const [cycles, setCycles] = useState(2);

  const handleSaveSettings = (
    work: number,
    rest: number,
    cycleCount: number,
  ) => {
    setWorkMinutes(work);
    setRestMinutes(rest);
    setCycles(cycleCount);
  };

  return (
    <View className="size-full flex items-center justify-center bg-black">
      <View className="w-full h-full flex flex-col">
        {/* Header */}
        <View className="text-center pt-8 pb-4 relative">
          <Text className="text-3xl font-bold">Focus Timer</Text>
          <Text className="text-sm text-muted-foreground mt-2">
            Stay productive with work and rest cycles
          </Text>
        </View>

        {/* Timer Component */}
        <View className="flex-1 flex items-center justify-center">
          <Timer
            workMinutes={workMinutes}
            restMinutes={restMinutes}
            cycles={cycles}
            onSettingsClick={() => setShowSettings(true)}
          />
        </View>

        {/* Settings Modal */}
        {showSettings && (
          <TimerSettings
            workMinutes={workMinutes}
            restMinutes={restMinutes}
            cycles={cycles}
            onSave={handleSaveSettings}
            onClose={() => setShowSettings(false)}
          />
        )}
      </View>
    </View>
  );
}

export default function App() {
  return <AppContent />;
}
