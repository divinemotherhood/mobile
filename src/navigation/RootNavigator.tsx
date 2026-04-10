// src/navigation/RootNavigator.tsx
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAuthStore } from '../store/useAuthStore';
import SplashScreen from '../modules/Splash/SplashScreen';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { setupQueryPersistence } from '../api/queryClient';

import FeaturesDemoScreen from '../modules/Features/FeaturesDemoScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const onboardingStep = useAuthStore((state) => state.onboardingStep);

  useEffect(() => {
    setupQueryPersistence();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        id="RootNavigator"
        screenOptions={{ headerShown: false }}
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Main" component={MainNavigator} />
        <Stack.Screen name="FeaturesDemo" component={FeaturesDemoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
