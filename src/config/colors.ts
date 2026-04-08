/**
 * Color constants for the Divine Motherhood app
 * Centralized color definitions for consistent theming across the app
 */

export const Colors = {
  // Primary Colors
  primary: '#1BA99D', // Teal/Green
  primary12: '#1BA99D1F',
  primaryLight: '#E8F5F1',
  primaryDark: '#008B6F',
  primaryGreen: '#8EC63F',

  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  black70: '#000000B3',
  background: '#F8F8F8',
  textFieldBg: '#F8FAFC',
  white_bg: '#FAFAFA',

  // Text Colors
  textPrimary: '#1A1A1A',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textLight: '#B0B0B0',

  // Accent Colors
  accent: '#FF6B6B', // Red/Pink
  accentLight: '#FFE8E8',
  accent_google: '#4285F4', // Google Blue

  // Functional Colors
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',

  // Border Colors
  border: '#E6E9EE',
  borderLight: '#F0F0F0',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.1)',

  // Splash Screen
  splashBg: '#FFFFFF',
  splashText: '#1A1A1A',
};

export type ColorType = keyof typeof Colors;
