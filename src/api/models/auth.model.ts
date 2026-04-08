export interface LoginRequest {
  idToken: string;
}

export interface LoginUser {
  id: string;
  email: string;
  full_name: string;
  profile_image?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  onboardingStep: number | boolean;
  user: LoginUser;
}

export interface OnboardingResponse {
  success: boolean;
  message: string;
  data: {
    onboarding_step: number | boolean;
  };
}

export interface ProfileUpdateResponse {
  success: boolean;
  message: string;
  onboardingStep?: number | boolean;
  profile_image?: string;
}
