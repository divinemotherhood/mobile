// src/navigation/MainNavigator.tsx
import React from 'react';
import { Text, View } from 'react-native'; // ← add View
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types/navigation';
import HomeNavigator from './HomeNavigator';

const Tab = createBottomTabNavigator<MainTabParamList>();

const SettingsPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Settings</Text>
  </View>
);

const ProfilePlaceholder = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Profile Tab</Text>
  </View>
);

export default function MainNavigator() {
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#0D1B2A',
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 4,
          backgroundColor: '#FFFFFF',
          borderTopColor: '#F0F0F0',
        },
        tabBarIcon: ({ size }) => {
          const icons: Record<string, string> = {
            HomeTab: '🏠',
            ProfileTab: '👤',
            SettingsTab: '⚙️',
          };
          return (
            <Text style={{ fontSize: size - 4 }}>
              {icons[route.name]}
            </Text>
          );
        },
        tabBarLabel: {
          HomeTab: 'Home',
          ProfileTab: 'Profile',
          SettingsTab: 'Settings',
        }[route.name],
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeNavigator} />
      <Tab.Screen name="ProfileTab" component={ProfilePlaceholder} />
      <Tab.Screen name="SettingsTab" component={SettingsPlaceholder} />
    </Tab.Navigator>
  );
}