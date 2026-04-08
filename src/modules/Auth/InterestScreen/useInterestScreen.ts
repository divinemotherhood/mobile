import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../types/navigation';
import { usePregnancyDetailMutation } from '../../../api/hooks/usePregnancyApi';

type InterestScreenNavProp = NativeStackNavigationProp<AuthStackParamList, 'InterestScreen'>;

export const useInterestScreen = () => {
  const navigation = useNavigation<InterestScreenNavProp>();
  const { mutate: submitForm, isPending } = usePregnancyDetailMutation(navigation);

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const isValid = selectedInterests.length > 0;

  const handleBack = () => navigation.goBack();

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) => 
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
     if (!isValid || isPending) return;

     submitForm({
       interests: selectedInterests
     });
  };

  return {
    selectedInterests,
    toggleInterest,
    handleBack,
    handleContinue,
    isValid,
    isPending,
  };
};

