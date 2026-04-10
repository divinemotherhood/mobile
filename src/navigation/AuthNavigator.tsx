import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
import LoginScreen from '../modules/Auth/Login/LoginScreen';
import ProfileScreen from '../modules/Auth/Profile/ProfileScreen';
import PregnancyDetailScreen from '../modules/Auth/PregnancyDetail/PregnancyDetailScreen';
import InterestScreen from '../modules/Auth/InterestScreen/InterestScreen';
import ProgramPricingScreen from '../modules/Auth/ProgramPricing/ProgramPricingScreen';
import PermissionScreen from '../modules/Auth/Permission/PermissionScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      id="AuthNavigator"
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="PregnancyDetail" component={PregnancyDetailScreen} />
      <Stack.Screen name="InterestScreen" component={InterestScreen} />
      <Stack.Screen name="ProgramPricing" component={ProgramPricingScreen} />
      <Stack.Screen name="Permission" component={PermissionScreen} /> 
    </Stack.Navigator>
  );
}