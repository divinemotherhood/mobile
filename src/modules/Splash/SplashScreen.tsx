/**
 * Splash Screen
 * Initial screen shown while app initializes
 * Features: Logo display and auto-navigation to Login after 3 seconds
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthStore } from '../../store';
import AppLogo from '../../assets/images/app_logo_with_text.svg';
import Text from '../../components/ui/Text/Text';
import { Colors } from '../../config/colors';
import { Padding } from '../../config/spacing';
import { Strings } from '../../config/strings';
import { RootStackParamList } from '../../types/navigation';
import { rf } from '../../utils/responsiveFont';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

const SPLASH_DURATION = 3000; // 3 seconds

export default function SplashScreen() {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const _hasHydrated = useAuthStore((state) => state._hasHydrated);
  const {  width,height } = useWindowDimensions();
  const isTablet = width >= 768;
const logoWidth  = width * 0.40;
const logoHeight = logoWidth * (112 / 148);
const buttonWidth = isTablet ? width * 0.35 : width * 0.65;

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
       // navigation.replace('Main');
        navigation.replace('FeaturesDemo');
      } else {
       // navigation.replace('Auth');
       navigation.replace('FeaturesDemo');
      }
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, [_hasHydrated, navigation]);

  return (
    <View style={[styles.container, { minHeight: height }]}>
      {/* Logo and branding at center */}
      <View style={styles.centerContent}>
        
        <AppLogo width={logoWidth} height={logoHeight} />


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
        
       <TouchableOpacity 
  style={{ marginTop: 20, paddingVertical: 12, backgroundColor: '#B388FF', borderRadius: 8, width: buttonWidth, alignItems: 'center' }}
  onPress={() => navigation.navigate('FeaturesDemo')}
>
  <Text family="bold" size="sm" style={{ fontSize: rf(14, 12, 17), color: 'white' }}>Test New Features</Text>
</TouchableOpacity>
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
