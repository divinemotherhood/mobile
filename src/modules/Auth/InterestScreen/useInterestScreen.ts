import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../types/navigation';

type InterestScreenNavProp = NativeStackNavigationProp<AuthStackParamList, 'InterestScreen'>;

export const useInterestScreen = () => {
  const navigation = useNavigation<InterestScreenNavProp>();

  const handleBack = () => navigation.goBack();

  return {
    handleBack,
  };
};
