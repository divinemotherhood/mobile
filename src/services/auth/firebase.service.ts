import { getApp, getApps, initializeApp } from '@react-native-firebase/app';
import {
  getAuth,
  getIdToken,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from '@react-native-firebase/auth';
import { Platform } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getUserApi, loginApi } from '../../api/endpoints/auth.api';
import { secureStorage } from '@shared/utils/storage';
import { useAuthStore } from '../../store/authStore';

let isGoogleConfigured = false;

const getOrInitializeFirebaseApp = () => {
  if (getApps().length > 0) {
    return getApp();
  }

  // Fallback for environments where native auto-init is not available yet.
  const appId =
    Platform.OS === 'android'
      ? '1:780512451149:android:2e596a64ea87a94c3c9a04'
      : '1:780512451149:ios:6b73a375952319803c9a04';

  return initializeApp({
    apiKey: 'AIzaSyClojxnfeR0e43VStkVR2vw4arcZWXKY-I',
    appId,
    projectId: 'divine-motherhood-web',
    messagingSenderId: '780512451149',
    storageBucket: 'divine-motherhood-web.firebasestorage.app',
    databaseURL: 'https://divine-motherhood-web-default-rtdb.firebaseio.com',
  });
};

// Configure Google Sign-In once per app launch.
export const configureGoogle = () => {
  if (isGoogleConfigured) {
    return;
  }

  GoogleSignin.configure({
    webClientId: '780512451149-03i4p4fqa6ptv7bcm1b6s8jbtquvd7d8.apps.googleusercontent.com',
    iosClientId: '780512451149-3m1rnj39cuf4lkaob054ek9njenfdot6.apps.googleusercontent.com',
  });

  isGoogleConfigured = true;
};

// Google Login with Firebase
export const signInWithGoogle = async () => {
  getOrInitializeFirebaseApp();
  configureGoogle();

  await GoogleSignin.hasPlayServices();

  const signInResult = await GoogleSignin.signIn();
  const idToken = signInResult?.data?.idToken ?? null;
  if (!idToken) {
    throw new Error('Google sign-in did not return an ID token.');
  }

  const authInstance = getAuth();
  const googleCredential1 = GoogleAuthProvider.credential(idToken);
  await signInWithCredential(authInstance, googleCredential1);

  const currentUser = authInstance.currentUser;
  if (!currentUser) {
    throw new Error('Firebase user not found');
  }

  const firebaseIdToken = await getIdToken(currentUser);
  const authData = await loginApi(firebaseIdToken);
  const accessToken = authData?.accessToken ?? firebaseIdToken;
  const profileResponse = await getUserApi(accessToken);
  const user = profileResponse?.user ?? null;

  return {
    ...authData,
    user,
    idToken: firebaseIdToken,
  };
};

// Logout
export const logoutUser = async () => {
  await secureStorage.clearTokens();
  useAuthStore.getState().logout();

  getOrInitializeFirebaseApp();
  await GoogleSignin.signOut();

  const authInstance = getAuth();
  if (authInstance.currentUser) {
    await signOut(authInstance);
  }
};