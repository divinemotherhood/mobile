import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../store/useAuthStore';
import { loginWithGoogle } from '../endpoints/auth.endpoints';
import { LoginResponse } from '../models/auth.model';
import { handleOnboardingNavigation } from '../../navigation/onboardingNavigator';

export const QUERY_KEYS = {
  AUTH: {
    LOGIN: ['auth', 'login'],
  },
};

export const useLoginMutation = (navigation: any) => {
  const login = useAuthStore((state) => state.login);
  const updateUser = useAuthStore((state) => state.updateUser);

  return useMutation<LoginResponse, Error, { idToken: string; userImage?: string }>({
    mutationFn: ({ idToken }) => loginWithGoogle(idToken),
    onSuccess: (data, variables) => {
      login(data.user, data.onboardingStep);
      if (variables.userImage && !data.user.userImage) {
        updateUser({ userImage: variables.userImage });
      }
      handleOnboardingNavigation(data.onboardingStep, navigation);
    },
    onError: (error) => {
      if (__DEV__) {
        console.warn('[Login Mutation Error]', error.message);
      }
    },
  });
};
