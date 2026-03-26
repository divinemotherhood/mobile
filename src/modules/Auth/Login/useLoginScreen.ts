// src/modules/Auth/Login/useLoginScreen.ts

import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { AuthStackParamList } from '../../../types/navigation';
import { useLoginMutation } from '../../../api/hooks/useAuthApi';

type NavProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export const useLoginScreen = () => {
  const navigation = useNavigation<NavProp>();
  const { mutateAsync: callLoginApi, isPending: apiLoading } = useLoginMutation(navigation);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '780512451149-03i4p4fqa6ptv7bcm1b6s8jbtquvd7d8.apps.googleusercontent.com  ',
    });
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const response = await GoogleSignin.signIn();
      console.log('=== GOOGLE SIGN IN RESPONSE START ===');
console.log(JSON.stringify(response, null, 2));
console.log('=== GOOGLE SIGN IN RESPONSE END ===');

      if (response.type !== 'success' || !response.data) {
        throw new Error('Google sign-in not completed');
      }

     const { idToken: googleIdToken } = response.data;
      const photo = response.data.user.photo;
      console.log('GOOGLE ID TOKEN:', googleIdToken);

      if (!googleIdToken) {
        throw new Error('No idToken received');
      }

      // Exchange Google token for Firebase token
      const googleCredential = auth.GoogleAuthProvider.credential(googleIdToken);
      await auth().signInWithCredential(googleCredential);
      const firebaseIdToken = await auth().currentUser?.getIdToken();

      console.log('FIREBASE ID TOKEN:', firebaseIdToken); // ← check this in logs

      if (!firebaseIdToken) {
        throw new Error('Failed to get Firebase ID token');
      }

      await callLoginApi({ idToken: firebaseIdToken, userImage: photo });} catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Sign in failed. Please try again.';
      setError(message);
      console.error('Google Sign-In error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTermsPress = () => {
    console.log('Open Terms');
  };

  return {
    isLoading: isLoading || apiLoading,
    error,
    handleGoogleLogin,
    handleTermsPress,
  };
};