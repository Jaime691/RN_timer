import { useTimerSettings } from '@/app/context/TimerContext';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

interface SettingsScreenProps {
  onClose: () => void;
}

export default function SettingsScreen({ onClose }: SettingsScreenProps) {
  const { settings, updateSettings } = useTimerSettings();
  const [cycles, setCycles] = useState(settings.cycles.toString());
  const [workTime, setWorkTime] = useState(settings.workTime.toString());
  const [restTime, setRestTime] = useState(settings.restTime.toString());

  const handleSave = () => {
    const cyclesNum = Math.max(0, Math.min(99, parseInt(cycles) || 0));
    const workNum = Math.max(0, Math.min(60, parseInt(workTime) || 0));
    const restNum = Math.max(0, Math.min(60, parseInt(restTime) || 0));

    updateSettings({
      cycles: cyclesNum,
      workTime: workNum,
      restTime: restNum,
    });

    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Timer Settings</Text>
        <Pressable onPress={onClose}>
          <Text style={styles.closeButton}>✕</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.settingGroup}>
          <Text style={styles.label}>Number of Cycles</Text>
          <Text style={styles.subLabel}>(0-99)</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            maxLength={2}
            value={cycles}
            onChangeText={setCycles}
            placeholderTextColor="#999"
          />
          <Text style={styles.value}>{cycles} cycles</Text>
        </View>

        <View style={styles.settingGroup}>
          <Text style={styles.label}>Work Time</Text>
          <Text style={styles.subLabel}>(0-60 minutes)</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            maxLength={2}
            value={workTime}
            onChangeText={setWorkTime}
            placeholderTextColor="#999"
          />
          <Text style={styles.value}>{workTime} minutes</Text>
        </View>

        <View style={styles.settingGroup}>
          <Text style={styles.label}>Rest Time</Text>
          <Text style={styles.subLabel}>(0-60 minutes)</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            maxLength={2}
            value={restTime}
            onChangeText={setRestTime}
            placeholderTextColor="#999"
          />
          <Text style={styles.value}>{restTime} minutes</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>
        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  closeButton: {
    fontSize: 28,
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  settingGroup: {
    marginBottom: 32,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  subLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
    backgroundColor: '#222',
  },
  value: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
