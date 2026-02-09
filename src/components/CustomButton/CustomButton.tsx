import { Pressable, PressableProps, Text } from 'react-native';

interface Props extends PressableProps {
  text: string;
  color?: 'primary' | 'secondary' | 'tertiary';
  variant?: 'filled' | 'outlined' | 'text';
}

const CustomButton = ({
  onPress,
  text,
  color = 'primary',
  variant = 'filled',
}: Props) => {
  const textColorMap = {
    primary: 'text-blue-500',
    secondary: 'text-green-500',
    tertiary: 'text-gray-100',
  }[color];

  const buttonColor = {
    primary: 'bg-blue-500',
    secondary: 'bg-green-500',
    tertiary: 'bg-gray-100',
  }[color];

  const borderColor = {
    primary: 'border-blue-500',
    secondary: 'border-green-500',
    tertiary: 'border-gray-100',
  }[color];

  const buttonVariant = {
    filled: `${buttonColor} active:opacity-70`,
    outlined: `border-2 ${borderColor} active:opacity-70`,
    text: 'bg-transparent active:opacity-70',
  }[variant];

  const textColor = {
    filled: 'text-white',
    outlined: textColorMap,
    text: textColorMap,
  }[variant];

  return (
    <Pressable
      onPress={onPress}
      className={`mx-4 p-3 rounded-full ${buttonVariant}`}
    >
      <Text className={`${textColor} text-2xl text-center`}>{text}</Text>
    </Pressable>
  );
};

export default CustomButton;
