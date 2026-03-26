// src/navigation/HomeNavigator.tsx
import React from 'react';
import { createNativeStackNavigator }
  from '@react-navigation/native-stack';
import { HomeStackParamList } from '../types/navigation';

import HomeScreen from '../modules/Home/HomeScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeNavigator() {
  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />

    </Stack.Navigator>
  );
}