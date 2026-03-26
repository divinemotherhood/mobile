// src/modules/Auth/Profile/useProfileScreen.ts

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { useAuthStore, useUser } from '../../../store/useAuthStore';
import { launchImageLibrary } from 'react-native-image-picker';

type RootNavProp = NativeStackNavigationProp<RootStackParamList>;

export const useProfileScreen = () => {
  const navigation = useNavigation<RootNavProp>();
  const user = useUser();
  const updateUser = useAuthStore((state) => state.updateUser);

  const [name, setName] = useState(user?.full_name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState('');
  const [userImage, setUserImage] = useState(user?.userImage ?? '');

  const handleBack = () => navigation.goBack();

  const handlePickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets[0]) {
          const source = response.assets[0].uri;
          setUserImage(source || '');
        }
      },
    );
  };

  const handleVerify = () => {
    console.log('Verify profile');
  };

  return {
    user,
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    userImage,
    handleBack,
    handlePickImage,
    handleVerify,
  };
};
