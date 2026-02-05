import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

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
    color: Colors.textPrimary,
    textAlign: 'center',
    marginVertical: 'auto',
  },
});
