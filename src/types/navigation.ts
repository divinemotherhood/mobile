/**
 * Navigation type definitions
 * Type-safe navigation across the app
 */

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
  FeaturesDemo: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Profile: undefined;        // no params — reads from store now
  PregnancyDetail: undefined;
  InterestScreen: undefined;
  ProgramPricing: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  ProfileTab: undefined;
  SettingsTab: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
};

