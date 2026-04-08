import { useMutation } from '@tanstack/react-query';
import { updateProfile } from '../endpoints/auth.endpoints';
import { useAuthStore } from '../../store/useAuthStore';
import { ProfileUpdateResponse } from '../models/auth.model';
import { handleOnboardingNavigation } from '../../navigation/onboardingNavigator';


export const useUpdateProfileMutation = (navigation: any) => {
  const updateUser = useAuthStore((state) => state.updateUser);

  return useMutation<ProfileUpdateResponse, Error, FormData>({
    mutationFn: (formData: FormData) => updateProfile(formData),
    onSuccess: (data) => {
      if (data.success) {
        if (data.profile_image) {
          updateUser({ profile_image: data.profile_image });
        }
        const step = data.onboardingStep ?? (data as any).onboarding_step;
        handleOnboardingNavigation(step, navigation, 'replace');
      }
    },
    onError: (error) => {
      if (__DEV__) {
        console.warn('[Update Profile Mutation Error]', error.message);
      }
    },
  });
};
