import apiClient from '../client';
import { ENDPOINTS } from '../apiConstants';
import { LoginResponse } from '../models/auth.model';

export const loginWithGoogle = async (
  token: string,
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(ENDPOINTS.AUTH.LOGIN, {
    idToken: token,
  });
  return response.data;
};
