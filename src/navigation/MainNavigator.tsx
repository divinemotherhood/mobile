// src/navigation/MainNavigator.tsx
import React from 'react';
import { Text, View } from 'react-native'; // ← add View
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { MainTabParamList } from '../types/navigation';
import HomeNavigator from './HomeNavigator';
import { useAuthStore } from '../store';
import Button from '../components/ui/Button/Button';

const Tab = createBottomTabNavigator<MainTabParamList>();

const SettingsPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Settings</Text>
  </View>
);

const ProfilePlaceholder = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigation = useNavigation<any>();

  const handleLogout = async () => {
    try {
      const { getAuth, signOut } = require('@react-native-firebase/auth');
      await signOut(getAuth());
    } catch (e) {
      console.warn('Firebase logout error:', e);
    }
    logout();
    navigation.replace('Auth');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
      <Text>Profile Tab</Text>
      <View style={{ width: 200 }}>
        <Button 
          title="Logout" 
          onPress={handleLogout}
          variant="secondary"
        />
      </View>
    </View>
  );
};

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