import apiClient from '../client';
import { ENDPOINTS } from '../apiConstants';
import { LoginResponse, OnboardingResponse, ProfileUpdateResponse } from '../models/auth.model';

export const loginWithGoogle = async (
  token: string,
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(ENDPOINTS.AUTH.LOGIN, {
    idToken: token,
  });
  return response.data;
};

export const updateProfile = async (formData: FormData): Promise<ProfileUpdateResponse> => {
  const response = await apiClient.put<ProfileUpdateResponse>(ENDPOINTS.AUTH.UPDATEUSER, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const submitPregnancyDetail = async (data: Record<string, any>): Promise<OnboardingResponse> => {
  const response = await apiClient.post<OnboardingResponse>(ENDPOINTS.AUTH.PREGNANCYDETAIL, data);
  return response.data;
};
