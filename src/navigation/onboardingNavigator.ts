import { CommonActions,NavigationProp } from '@react-navigation/native';
import { AuthStackParamList } from '../types/navigation'; // Adjust path to your types
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AuthNavProp = NativeStackNavigationProp<AuthStackParamList>;
type AuthRoutes = keyof AuthStackParamList;
export const handleOnboardingNavigation = (
  onboardingStep: number | boolean,
  navigation: AuthNavProp,
  method: 'replace' | 'navigate' = 'navigate',
) => {
  if (onboardingStep === 4) {
     navigation.navigate('Permission');
    return;
  }

  const stepToScreen: Record<number, AuthRoutes> = {
    1: 'Profile',
    2: 'PregnancyDetail',
    3: 'InterestScreen',
  
  };

  const screen = stepToScreen[onboardingStep as number];
  if (screen) {
  navigation[method](screen);
    
  }
};
