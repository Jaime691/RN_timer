import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useTimerStore } from '../../store/timerStore';

export default function Timers() {
  const { setCurrentTimer, timers } = useTimerStore();

  const handleSelectTimer = (id: string) => {
    setCurrentTimer(id);
    router.push('/timer');
  };

  return (
    <View className="flex p-4 bg-black h-full w-full">
      <FlatList
        data={timers}
        renderItem={({ item }) => (
          <View className="border-b border-gray-200 p-4 flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-semibold text-gray-50">
                Timer name: {item.name}
              </Text>
              <Text className="text-gray-300">
                Work Minutes: {item.workMinutes}
              </Text>
              <Text className="text-gray-300">
                Rest Minutes: {item.restMinutes}
              </Text>
              <Text className="text-gray-300">Cycles: {item.cycles}</Text>
            </View>
            <View>
              <Pressable
                onPress={() => handleSelectTimer(item.id)}
                className="active:opacity-70 text-gray-50"
              >
                <ChevronRight size={64} color="#f9fafb" />
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}
