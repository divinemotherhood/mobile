import { useMutation } from '@tanstack/react-query';
import { submitPregnancyDetail } from '../endpoints/auth.endpoints';
import { useAuthStore } from '../../store/useAuthStore';
import { handleOnboardingNavigation } from '../../navigation/onboardingNavigator';
import { OnboardingResponse,PregnancyDetailRequest } from '../models/auth.model';
import { AuthStackParamList } from '../../types/navigation';
import { NavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AuthNavProp = NativeStackNavigationProp<AuthStackParamList>;

export const usePregnancyDetailMutation = (navigation: AuthNavProp) => {
  const setOnboardingStep = useAuthStore((state) => state.setOnboardingStep);

  return useMutation<OnboardingResponse, Error, PregnancyDetailRequest>({
    mutationFn: (data: PregnancyDetailRequest) => submitPregnancyDetail(data),
    onSuccess: (response) => {
      if (response.success && response.data) {
        if (response.data.onboarding_step) {
          setOnboardingStep(response.data.onboarding_step);
          handleOnboardingNavigation(response.data.onboarding_step, navigation);
        }
      }
    },
    onError: (error) => {
      if (__DEV__) {
        console.warn('[Pregnancy Detail API Error]', error.message);
      }
    },
  });
};
