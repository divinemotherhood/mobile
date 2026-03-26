import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
import { mmkv, TOKEN_KEYS } from '../services/storage/mmkv';
import { LoginUser } from '../api/models/auth.model';

export interface AuthStoreState {
  user: LoginUser | null;
  isAuthenticated: boolean;
  onboardingStep: number | boolean | null;

  login: (
    user: LoginUser,
    onboardingStep: number | boolean,
  ) => void;
  logout: () => void;
  setOnboardingStep: (step: number | boolean) => void;
  updateUser: (updates: Partial<LoginUser>) => void;
}

const zustandStorage: PersistStorage<AuthStoreState> = {
  getItem: async (name: string) => {
    const value = mmkv.getString(name);
    return value === undefined ? null : value;
  },
  setItem: async (name: string, value: unknown) => {
    if (typeof value === 'string') {
      mmkv.set(name, value);
    } else if (value !== undefined) {
      mmkv.set(name, JSON.stringify(value));
    }
  },
  removeItem: async (name: string) => {
    mmkv.delete(name);
  },
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      onboardingStep: null,

      login: (user, onboardingStep) => {
        set({
          user,
          isAuthenticated: true,
          onboardingStep,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          onboardingStep: null,
        });
      },

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
      }) as Partial<AuthStoreState>,
    },
  ),
);

export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useOnboardingStep = () => useAuthStore((state) => state.onboardingStep);
