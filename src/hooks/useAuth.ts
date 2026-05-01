import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import { signInWithGoogle } from "../services/auth/firebase.service";
import { secureStorage } from "@shared/utils/storage";

export const useGoogleAuth = () => {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: signInWithGoogle,
    onSuccess: async (data) => {
      await secureStorage.setTokens(data.idToken);
      await setAuth({
        user: data.user ?? null,
        accessToken: data.accessToken ?? data.idToken,
        firebaseUser: data.firebaseUser ?? null,
      });
    },
  });
};