import { Moon, Sun } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from './components/ThemeProvider';
import Timer from './components/Timer';
import TimerSettings from './components/TimerSettings';
import './global.css';

function AppContent() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(1);
  const [restMinutes, setRestMinutes] = useState(1);
  const [cycles, setCycles] = useState(2);
  const { theme, setTheme } = useTheme();

  const handleSaveSettings = (
    work: number,
    rest: number,
    cycleCount: number,
  ) => {
    setWorkMinutes(work);
    setRestMinutes(rest);
    setCycles(cycleCount);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <View className="size-full flex items-center justify-center bg-background">
      <View className="w-full h-full flex flex-col">
        {/* Header */}
        <View className="text-center pt-8 pb-4 relative">
          <Text className="text-3xl font-bold">Focus Timer</Text>
          <Text className="text-sm text-muted-foreground mt-2">
            Stay productive with work and rest cycles
          </Text>
          {/* Theme Toggle Button */}
          <Pressable
            onPress={toggleTheme}
            className="absolute top-8 right-8 rounded-full"
          >
            {theme === 'dark' ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </Pressable>
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
