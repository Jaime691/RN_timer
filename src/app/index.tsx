import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import './global.css';

function AppContent() {
  return (
    <View className="h-full w-full flex flex-col bg-black">
      {/* Header */}
      <View className="bg-amber-400 w-full py-6 px-4 align-top">
        <Text className="text-3xl font-bold text-white">Focus Timer</Text>
        <Text className="text-sm text-muted-foreground mt-2 text-white">
          Stay productive with work and rest cycles
        </Text>
      </View>
      <View className="flex gap-6 mt-10">
        <Link
          href="/settings"
          className="px-4 py-2 mb-4 bg-gray-800 rounded-lg"
        >
          <Text className="text-white">Settings</Text>
        </Link>
        <Link href="/timer" className="px-4 py-2 mb-4 bg-gray-800 rounded-lg">
          <Text className="text-white">Start Timer</Text>
        </Link>
      </View>
    </View>
  );
}

export default function App() {
  return <AppContent />;
}
