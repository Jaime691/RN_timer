import { TimerProvider } from '@/app/context/TimerContext';
import { globalStyles } from '@/styles/global-styles';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TimerProvider>
      <View style={globalStyles.background}>
        <Slot />

        <StatusBar style="light" />
      </View>
    </TimerProvider>
  );
}
