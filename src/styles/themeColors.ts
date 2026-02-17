// Single source of truth for all colors used across the app
// Used in: nativewind.config.ts (Tailwind), components (direct color values)
export const themeColors = {
  // Neon Pop
  neonPink: '#ff00ff',
  neonBlue: '#00d4ff',
  neonPurple: '#702283',
  neonCyan: '#08f7fe',
  neonOrange: '#ff8c00',
  neonAbyss: '#1a1a2e',
  neonWhite: '#ffffff',

  // Opaque variants
  opaquePink: '#8c2d8c',
  opaqueCyan: '#058b8f',
  opaqueBlue: '#206d8a',
  opaquePurple: '#42144d',
  opaqueOrange: '#a35d00',
  opaqueAbyss: '#121221',
  opaqueGray: '#b0b0b0',
} as const;

export type ThemeColor = keyof typeof themeColors;
