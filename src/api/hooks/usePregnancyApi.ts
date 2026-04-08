import { useMutation } from '@tanstack/react-query';
import { submitPregnancyDetail } from '../endpoints/auth.endpoints';
import { useAuthStore } from '../../store/useAuthStore';
import { handleOnboardingNavigation } from '../../navigation/onboardingNavigator';
import { OnboardingResponse } from '../models/auth.model';

export const usePregnancyDetailMutation = (navigation: any) => {
  const setOnboardingStep = useAuthStore((state) => state.setOnboardingStep);

  return useMutation<OnboardingResponse, Error, Record<string, any>>({
    mutationFn: (data: Record<string, any>) => submitPregnancyDetail(data),
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
