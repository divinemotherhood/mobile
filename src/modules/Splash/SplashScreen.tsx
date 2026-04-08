/**
 * Splash Screen
 * Initial screen shown while app initializes
 * Features: Logo display and auto-navigation to Login after 3 seconds
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthStore } from '../../store';
import AppLogo from '../../assets/images/app_logo_with_text.svg';
import Text from '../../components/ui/Text/Text';
import { Colors } from '../../config/colors';
import { Padding } from '../../config/spacing';
import { Strings } from '../../config/strings';
import { RootStackParamList } from '../../types/navigation';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

const SPLASH_DURATION = 3000; // 3 seconds

export default function SplashScreen() {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const _hasHydrated = useAuthStore((state) => state._hasHydrated);
  const { height } = useWindowDimensions();

  useEffect(() => {
    // Only proceed if store is fully hydrated from AsyncStorage
    if (!_hasHydrated) return;

    const timer = setTimeout(() => {
      const state = useAuthStore.getState();
      
      // Robust check: finished onboarding (4 or true)
      const finishedOnboarding = 
        state.isLoggedIn || 
        Number(state.onboardingStep) === 4 || 
        state.onboardingStep === true;

      console.log('SplashScreen Navigation decision:', { 
        isLoggedIn: state.isLoggedIn, 
        onboardingStep: state.onboardingStep,
        finishedOnboarding 
      });

      if (finishedOnboarding) {
        navigation.replace('Main');
      } else {
        navigation.replace('Auth');
      }
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, [_hasHydrated, navigation]);

  return (
    <View style={[styles.container, { minHeight: height }]}>
      {/* Logo and branding at center */}
      <View style={styles.centerContent}>
        <AppLogo width={148} height={112} />


      </View>

      {/* Tagline at bottom */}
      <View style={styles.bottomContent}>
        <Text
          family="regular"
          size="sm"
          color="textSecondary"
          align="center"
        >
          {Strings.splash.tagline}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.splashBg,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Padding.screenVertical,
    paddingHorizontal: Padding.screenHorizontal,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  titlePart: {
    marginHorizontal: 2,
  },
  bottomContent: {
    paddingBottom: Padding.container,
    paddingHorizontal: Padding.container,
    alignItems: 'center',
  },
  subtitle: {
    marginTop: 12,
  },
});
