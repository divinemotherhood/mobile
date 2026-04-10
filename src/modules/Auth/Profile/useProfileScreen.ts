// src/modules/Auth/Profile/useProfileScreen.ts

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { useAuthStore, useUser } from '../../../store/useAuthStore';
import { launchImageLibrary } from 'react-native-image-picker';
import { useUpdateProfileMutation } from '../../../api/hooks/useProfileApi';

type RootNavProp = NativeStackNavigationProp<RootStackParamList>;
import { AuthStackParamList } from '../../../types/navigation';
type AuthNavProp = NativeStackNavigationProp<AuthStackParamList>;
const navigation = useNavigation<AuthNavProp>();
export const useProfileScreen = () => {
  const user = useUser();
  const updateUser = useAuthStore((state) => state.updateUser);

  const { mutate: updateProfileApi, isPending } = useUpdateProfileMutation(navigation);

  const [name, setName] = useState(user?.full_name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState('');
  const [userImage, setUserImage] = useState(user?.profile_image ?? '');

  const isValid = phone.trim().length > 0;

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
    if (!isValid) return;

    const formData = new FormData();
    formData.append('full_name', name);
    formData.append('country_code', '91');
    formData.append('whatsapp_number', phone);
    
    if (userImage && typeof userImage === 'string' && !userImage.startsWith('http')) {
      const filename = userImage.split('/').pop() || 'profileImage.jpg';
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image/jpeg';
      
      formData.append('profile_image', {
        uri: userImage,
        name: filename,
        type: type,
      } );
     
    }

    updateProfileApi(formData);
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
    handleDemo: () => navigation.navigate('FeaturesDemo'),
    isValid,
    isPending,
  };
};
