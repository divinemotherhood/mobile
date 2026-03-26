import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../types/navigation';

type ProgramPricingNavProp = NativeStackNavigationProp<AuthStackParamList, 'ProgramPricing'>;

export const useProgramPricing = () => {
  const navigation = useNavigation<ProgramPricingNavProp>();

  const handleBack = () => navigation.goBack();

  return {
    handleBack,
  };
};
