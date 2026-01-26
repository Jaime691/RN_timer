import { StyleSheet } from 'react-native';
import { Colors } from '../app/constants/Colors';
import { TIMER_CONSTANTS } from '../app/constants/TimerConstants';

export const globalStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },

  appContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },

  timer: {
    fontSize: TIMER_CONSTANTS.TIMER_FONT_SIZE,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginVertical: 'auto',
  },
});
