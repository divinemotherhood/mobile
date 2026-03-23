/**
 * Navigation type definitions
 * Type-safe navigation across the app
 */

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  // Add more screens here as needed
  Home: undefined;
  Profile: undefined;
};

export type ScreenName = keyof RootStackParamList;
