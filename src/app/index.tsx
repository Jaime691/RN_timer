import { router } from 'expo-router';
import { View } from 'react-native';
import CustomButton from '../components/CustomButtom/CustomButton';
import './global.css';

function AppContent() {
  return (
    <View className="h-full w-full flex flex-col bg-black">
      <View className="flex gap-6 mt-10">
        <CustomButton
          text="Timer"
          color="primary"
          onPress={() => router.push('/timer')}
        />
        <CustomButton
          text="Settings"
          color="secondary"
          variant="outlined"
          onPress={() => router.push('/settings')}
        />
        <CustomButton
          text="Settings link"
          color="tertiary"
          variant="text"
          onPress={() => router.push('/settings')}
        />
      </View>
    </View>
  );
}

export default function App() {
  return <AppContent />;
}
