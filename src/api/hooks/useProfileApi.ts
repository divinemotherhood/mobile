import { useMutation } from '@tanstack/react-query';
import { updateProfile } from '../endpoints/auth.endpoints';
import { useAuthStore } from '../../store/useAuthStore';
import { ProfileUpdateResponse } from '../models/auth.model';
import { handleOnboardingNavigation } from '../../navigation/onboardingNavigator';
import { AuthStackParamList } from '../../types/navigation';
import { NavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AuthNavProp = NativeStackNavigationProp<AuthStackParamList>;

export const useUpdateProfileMutation = (navigation: AuthNavProp) => {
  const updateUser = useAuthStore((state) => state.updateUser);

  return useMutation<ProfileUpdateResponse, Error, FormData>({
    mutationFn: (formData: FormData) => updateProfile(formData),
    onSuccess: (data) => {
      if (data.success) {
        if (data.profile_image) {
          updateUser({ profile_image: data.profile_image });
        }
        const step = data.onboardingStep
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
