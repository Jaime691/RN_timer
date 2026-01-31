import { Minus, Plus, X } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

interface TimerSettingsProps {
  workMinutes: number;
  restMinutes: number;
  cycles: number;
  onSave: (workMinutes: number, restMinutes: number, cycles: number) => void;
  onClose: () => void;
}

export default function TimerSettings({
  workMinutes,
  restMinutes,
  cycles,
  onSave,
  onClose,
}: TimerSettingsProps) {
  const [work, setWork] = useState(workMinutes);
  const [rest, setRest] = useState(restMinutes);
  const [cycleCount, setCycleCount] = useState(cycles);

  const handleSave = () => {
    onSave(work, rest, cycleCount);
    onClose();
  };

  const adjustValue = (
    value: number,
    setter: (value: number) => void,
    delta: number,
    min: number,
    max: number,
  ) => {
    const newValue = Math.max(min, Math.min(max, value + delta));
    setter(newValue);
  };

  return (
    <View className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <View className="w-full max-w-md p-6 gap-6">
        {/* Header */}
        <View className="flex flex-row items-center justify-between mb-8">
          <Text className="text-2xl font-semibold text-white">
            Timer Settings
          </Text>
          <Pressable onPress={onClose}>
            <X className="size-5" color="#ffffff" />
          </Pressable>
        </View>

        {/* Work Duration */}
        <View className="space-y-3">
          <Text className="text-base mb-3">Work Duration (minutes)</Text>
          <View className="flex flex-row items-center justify-between gap-4">
            <Pressable
              onPress={() => adjustValue(work, setWork, -1, 1, 60)}
              className="rounded-full size-12 border-2 items-center justify-center"
            >
              <Minus className="size-5" />
            </Pressable>
            <View className="flex-1 text-center">
              <Text className="text-4xl font-bold tabular-nums">{work}</Text>
              <Text className="text-sm text-muted-foreground ml-2">min</Text>
            </View>
            <Pressable
              onPress={() => adjustValue(work, setWork, 1, 1, 60)}
              className="rounded-full size-12 border-2 items-center justify-center"
            >
              <Plus className="size-5 " />
            </Pressable>
          </View>
          {/* Quick Presets */}
          <View className="flex flex-row gap-2 justify-center">
            {[15, 25, 45].map((preset) => (
              <Pressable
                key={preset}
                onPress={() => setWork(preset)}
                className="flex flex-row border-2 items-baseline justify-center rounded-full px-3 py-1"
              >
                <Text>{preset}m</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Rest Duration */}
        <View className="space-y-3">
          <Text className="text-base mb-3">Rest Duration (minutes)</Text>
          <View className="flex flex-row items-center justify-between gap-4">
            <Pressable
              onPress={() => adjustValue(rest, setRest, -1, 1, 30)}
              className="rounded-full size-12 border-2 items-center justify-center"
            >
              <Minus className="size-5" />
            </Pressable>
            <View className="flex-1 text-center">
              <Text className="text-4xl font-bold tabular-nums">{rest}</Text>
              <Text className="text-sm text-muted-foreground ml-2">min</Text>
            </View>
            <Pressable
              onPress={() => adjustValue(rest, setRest, 1, 1, 30)}
              className="rounded-full size-12 border-2 items-center justify-center"
            >
              <Plus className="size-5" />
            </Pressable>
          </View>
          {/* Quick Presets */}
          <View className="flex flex-row gap-2 justify-center">
            {[5, 10, 15].map((preset) => (
              <Pressable
                key={preset}
                onPress={() => setRest(preset)}
                className="rounded-full flex flex-row border-2 items-baseline justify-center px-3 py-1"
              >
                <Text>{preset}m</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Cycles */}
        <View className="space-y-3">
          <Text className="text-base mb-3">Number of Cycles</Text>
          <View className="flex flex-row items-center justify-between gap-4">
            <Pressable
              onPress={() => adjustValue(cycleCount, setCycleCount, -1, 1, 10)}
              className="rounded-full size-12 border-2 items-center justify-center"
            >
              <Minus className="size-5" />
            </Pressable>
            <View className="flex-1 text-center">
              <Text className="text-4xl font-bold tabular-nums">
                {cycleCount}
              </Text>
              <Text className="text-sm text-muted-foreground ml-2">cycles</Text>
            </View>
            <Pressable
              onPress={() => adjustValue(cycleCount, setCycleCount, 1, 1, 10)}
              className="rounded-full size-12 border-2 items-center justify-center"
            >
              <Plus className="size-5" />
            </Pressable>
          </View>
          {/* Quick Presets */}
          <View className="flex flex-row gap-2 justify-center">
            {[2, 4, 6].map((preset) => (
              <Pressable
                key={preset}
                onPress={() => setCycleCount(preset)}
                className="rounded-full flex flex-row border-2 items-baseline justify-center px-3 py-1"
              >
                <Text>{preset}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Save Pressable */}
        <Pressable
          onPress={handleSave}
          className="w-full rounded-2xl py-3 border-2 items-center justify-center mt-4"
        >
          <Text className="text-lg font-semibold">Save Settings</Text>
        </Pressable>
      </View>
    </View>
  );
}
