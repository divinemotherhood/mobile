import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../types/navigation';

type PregnancyDetailNavProp = NativeStackNavigationProp<AuthStackParamList, 'PregnancyDetail'>;

export const usePregnancyDetail = () => {
  const navigation = useNavigation<PregnancyDetailNavProp>();

  const handleBack = () => {
    navigation.goBack();
  };

  return {
    handleBack,
  };
};
