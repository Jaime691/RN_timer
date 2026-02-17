import type { Config } from 'tailwindcss';
import { themeColors } from './src/styles/themeColors';

const colors = {
  // Neon Pop
  'neon-pink': themeColors.neonPink,
  'neon-blue': themeColors.neonBlue,
  'neon-purple': themeColors.neonPurple,
  'neon-cyan': themeColors.neonCyan,
  'neon-orange': themeColors.neonOrange,
  'neon-abyss': themeColors.neonAbyss,
  'neon-white': themeColors.neonWhite,

  // Opaque variants
  'opaque-pink': themeColors.opaquePink,
  'opaque-cyan': themeColors.opaqueCyan,
  'opaque-blue': themeColors.opaqueBlue,
  'opaque-purple': themeColors.opaquePurple,
  'opaque-orange': themeColors.opaqueOrange,
  'opaque-abyss': themeColors.opaqueAbyss,
  'opaque-gray': themeColors.opaqueGray,

  // Standard colors
  black: '#000000',
  white: '#ffffff',
};

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors,
    },
  },
} satisfies Config;
