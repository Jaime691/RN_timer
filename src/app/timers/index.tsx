import { FlatList, Text, View } from 'react-native';
import { useTimerStore } from '../../store/timerStore';

export default function Timers() {
  const timers = useTimerStore((state) => state.timers);

  return (
    <View className="flex p-4">
      <FlatList
        data={timers}
        renderItem={({ item }) => (
          <View className="border-b border-gray-200 p-4">
            <Text className="text-lg font-semibold">
              Timer name: {item.name}
            </Text>
            <Text>Work Minutes: {item.workMinutes}</Text>
            <Text>Rest Minutes: {item.restMinutes}</Text>
            <Text>Cycles: {item.cycles}</Text>
          </View>
        )}
      />
    </View>
  );
}
