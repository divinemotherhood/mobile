import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
import { mmkv } from '../services/storage/mmkv';
import { LoginUser } from '../api/models/auth.model';

interface AuthState {
  user: LoginUser | null;
  isAuthenticated: boolean;
  onboardingStep: number | boolean | null;

  login: (user: LoginUser, onboardingStep: number | boolean) => void;
  logout: () => void;
  setOnboardingStep: (step: number | boolean) => void;
  updateUser: (updates: Partial<LoginUser>) => void;
}

interface PersistedAuthState {
  user: LoginUser | null;
  isAuthenticated: boolean;
  onboardingStep: number | boolean | null;
}

const zustandStorage: PersistStorage<PersistedAuthState> = {
  getItem: async (name: string) => {
    const value = mmkv.getString(name);
    return value === undefined ? null : JSON.parse(value);
  },
  setItem: async (name: string, value: any) => {
    mmkv.set(name, JSON.stringify(value));
  },
  removeItem: async (name: string) => {
    mmkv.delete(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      onboardingStep: null,

      login: (user, onboardingStep) =>
        set({
          user,
          isAuthenticated: true,
          onboardingStep,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          onboardingStep: null,
        }),

      setOnboardingStep: (step) => set({ onboardingStep: step }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: 'divine-motherhood-auth-storage',
      storage: zustandStorage,
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        onboardingStep: state.onboardingStep,
      }),
    },
  ),
);

export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useOnboardingStep = () => useAuthStore((state) => state.onboardingStep);
