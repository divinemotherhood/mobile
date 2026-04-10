import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../store/useAuthStore';
import { loginWithGoogle } from '../endpoints/auth.endpoints';
import { LoginResponse } from '../models/auth.model';
import { handleOnboardingNavigation } from '../../navigation/onboardingNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation';

type AuthNavProp = NativeStackNavigationProp<AuthStackParamList>;
export const QUERY_KEYS = {
  AUTH: {
    LOGIN: ['auth', 'login'],
  },
};

export const useLoginMutation = (navigation: AuthNavProp) => {
  const login = useAuthStore((state) => state.login);
  const updateUser = useAuthStore((state) => state.updateUser);

  return useMutation<LoginResponse, Error, { idToken: string; userImage?: string }>({
    mutationFn: ({ idToken }) => loginWithGoogle(idToken),
    onSuccess: (data, variables) => {
      const step = data.user?.onboardingStep
      login(data.user, step);
      if (variables.userImage && !data.user.profile_image) {
        updateUser({ profile_image: variables.userImage });
      }
      handleOnboardingNavigation(step, navigation, 'replace');
    },
    onError: (error) => {
      if (__DEV__) {
        console.warn('[Login Mutation Error]', error.message);
      }
    },
  });
};
