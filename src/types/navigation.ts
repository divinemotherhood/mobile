/**
 * Navigation type definitions
 * Type-safe navigation across the app
 */

export type RootStackParamList = {
  Splash: Record<string, never>;
  Auth: Record<string, never>;
  Main: Record<string, never>;
  FeaturesDemo: Record<string, never>;
};

export type AuthStackParamList = {
  Login: Record<string, never>;
  Profile: Record<string, never>;        // no params — reads from store now
  PregnancyDetail: Record<string, never>;
  InterestScreen: Record<string, never>;
  ProgramPricing: Record<string, never>;
  Permission: Record<string, never>;
  FeaturesDemo: {};
};

export type MainTabParamList = {
  HomeTab: Record<string, never>;
  ProfileTab: Record<string, never>;
  SettingsTab: Record<string, never>;
};

export type HomeStackParamList = {
  Home: Record<string, never>;
};

