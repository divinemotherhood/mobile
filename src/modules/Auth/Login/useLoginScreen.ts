// src/modules/Auth/Login/useLoginScreen.ts

import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getAuth, signOut, GoogleAuthProvider, signInWithCredential, getIdToken } from '@react-native-firebase/auth';
import { AuthStackParamList } from '../../../types/navigation';
import { useLoginMutation } from '../../../api/hooks/useAuthApi';

import { useAuthStore } from '../../../store';
import { handleOnboardingNavigation } from '../../../navigation/onboardingNavigator';
import { GOOGLE_WEB_CLIENT_ID } from '../../../api/apiConstants';

type NavProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export const useLoginScreen = () => {
  const navigation = useNavigation<NavProp>();
  const { mutateAsync: callLoginApi, isPending: apiLoading } = useLoginMutation(navigation);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const onboardingStep = useAuthStore((state) => state.onboardingStep);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('=== useEffect FIRED ===');
  console.log('isAuthenticated:', isAuthenticated);
  console.log('onboardingStep:', onboardingStep);
    if (isAuthenticated && onboardingStep) {
          console.log('=== NAVIGATING to step:', onboardingStep);

    handleOnboardingNavigation(onboardingStep, navigation);
  }
  }, [isAuthenticated, onboardingStep, navigation]);

  useEffect(() => {
    GoogleSignin.configure({
      //this id is deifne in constants file and imported here, make sure to add your own web client id there
      webClientId: GOOGLE_WEB_CLIENT_ID//'780512451149-03i4p4fqa6ptv7bcm1b6s8jbtquvd7d8.apps.googleusercontent.com',
    });
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Safely sign out from previous sessions 
      try {
        await GoogleSignin.signOut();
      } catch (e) {}

      try {
        const authInstance = getAuth();
        if (authInstance.currentUser) {
          await signOut(authInstance);
        }
      } catch (e) {}

      const response = await GoogleSignin.signIn();
      console.log('=== GOOGLE SIGN IN RESPONSE START ===');
      console.log(JSON.stringify(response, null, 2));
      console.log('=== GOOGLE SIGN IN RESPONSE END ===');

      if (response.type !== 'success' || !response.data) {
        throw new Error('Google sign-in not completed');
      }


      const { idToken } = response.data;
      const photo = response.data.user.photo;

      console.log('GOOGLE ID TOKEN:', idToken);
      const authInstance = getAuth();
      const googleCredential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(authInstance, googleCredential);
      
      const currentUser = authInstance.currentUser;
      if (!currentUser) {
        throw new Error('Firebase user not found');
      }
      
      const firebaseIdToken = await getIdToken(currentUser);
      console.log('firebaseIdToken ID TOKEN:', firebaseIdToken);

      if (!firebaseIdToken) {
        throw new Error('No idToken received');
      }

      await callLoginApi({
        idToken: firebaseIdToken as string,
        userImage: photo,
      });
      
      //navigation.navigate('Profile');
    } catch (err: unknown) {

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