import { TIMER_CONSTANTS } from '@/app/constants/TimerConstants';
import { Pressable, StyleSheet, Text } from 'react-native';

interface FABProps {
  label?: string;
  position?: 'right' | 'left';
  onPress: () => void;
  onLongPress: () => void;
}

export default function FAB({
  onPress,
  onLongPress,
  position = 'right',
  label,
}: FABProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={(pressed) => [
        styles.floatingButton,
        position === 'right' ? styles.positionRight : styles.positionLeft,
        pressed ? { opacity: 0.75 } : { opacity: 1 },
      ]}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: TIMER_CONSTANTS.FAB_BOTTOM_POSITION,
    backgroundColor: 'blue',
    height: TIMER_CONSTANTS.FAB_SIZE,
    width: TIMER_CONSTANTS.FAB_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: TIMER_CONSTANTS.FAB_BORDER_RADIUS,
    elevation: 5,
  },

  positionRight: {
    right: TIMER_CONSTANTS.FAB_SIDE_POSITION,
  },

  positionLeft: {
    left: TIMER_CONSTANTS.FAB_SIDE_POSITION,
  },

  buttonText: {
    color: 'white',
    fontWeight: 300,
    fontSize: 30,
  },
});
