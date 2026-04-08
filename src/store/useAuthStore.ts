import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginUser } from '../api/models/auth.model';

interface AuthState {
  user: LoginUser | null;
  isAuthenticated: boolean;
  onboardingStep: number | boolean | null;
  isLoggedIn: boolean;
  _hasHydrated: boolean; 

  login: (user: LoginUser, onboardingStep: number | boolean) => void;
  logout: () => void;
  setOnboardingStep: (step: number | boolean) => void;
  setIsLoggedIn: (val: boolean) => void;
  updateUser: (updates: Partial<LoginUser>) => void;
  setHasHydrated: (val: boolean) => void; 
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      onboardingStep: null,
      isLoggedIn: false,
      _hasHydrated: false,

      // ✅ sets isLoggedIn based on onboardingStep
      login: (user, onboardingStep) =>
        set({
          user,
          isAuthenticated: true,
          onboardingStep,
          isLoggedIn: Number(onboardingStep) === 4 || onboardingStep === true,
        }),

      // ✅ clears everything including isLoggedIn
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          onboardingStep: null,
          isLoggedIn: false,
        }),

      // ✅ sets isLoggedIn when step reaches 4
      setOnboardingStep: (step) =>
        set({
          onboardingStep: step,
          isLoggedIn: Number(step) === 4 || step === true,
        }),

      // ✅ manual override for Interest screen
      setIsLoggedIn: (val) => set({ isLoggedIn: val }),

      setHasHydrated: (val) => set({ _hasHydrated: val }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: 'divine-motherhood-auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        onboardingStep: state.onboardingStep,
        isLoggedIn: state.isLoggedIn,
      }),
    },
  ),
);

export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useOnboardingStep = () => useAuthStore((state) => state.onboardingStep);
export const useIsLoggedIn = () => useAuthStore((state) => state.isLoggedIn);