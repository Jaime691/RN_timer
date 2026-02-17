import { useFonts } from 'expo-font';
import { router, Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../styles/themeColors';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-neon-abyss">
      <View
        className=" w-full py-6 px-4 align-top"
        style={{ backgroundColor: themeColors.neonPink }}
      >
        <Pressable onPress={() => router.push('/')} className="w-full">
          <Text className="text-6xl font-bold text-neon-white">
            Focus Timer
          </Text>
        </Pressable>
        <Text className="text-2xl text-muted-foreground mt-2 text-neon-white">
          Stay productive with work and rest cycles
        </Text>
      </View>
      <Slot />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
