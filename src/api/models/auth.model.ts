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
  onboardingStep: number;
  user: LoginUser;
}

export interface OnboardingResponse {
  success: boolean;
  message: string;
  data: {
    onboarding_step: number;
  };
}
export interface PregnancyDetailRequest {
  is_first_baby?: boolean;
  lmp_date?: string;
  complications?: string[];
  interests?: string[];
}

export interface ProfileUpdateResponse {
  success: boolean;
  message: string;
  onboardingStep?: number;
  profile_image?: string;
}
