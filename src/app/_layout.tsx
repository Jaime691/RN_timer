import { useFonts } from 'expo-font';
import { router, Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="bg-amber-400 w-full py-6 px-4 align-top">
        <Pressable onPress={() => router.push('/')} className="w-full">
          <Text className="text-6xl font-bold text-white">Focus Timer</Text>
        </Pressable>
        <Text className="text-2xl text-muted-foreground mt-2 text-white">
          Stay productive with work and rest cycles
        </Text>
      </View>
      <Slot />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
