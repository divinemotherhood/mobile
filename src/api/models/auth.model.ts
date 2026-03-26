export interface LoginRequest {
  idToken: string;
}

export interface LoginUser {
  id: string;
  email: string;
  full_name: string;
  userImage?: string;
}

export interface LoginResponse {
  message: string;
  onboardingStep: number | boolean;
  user: LoginUser;
}
