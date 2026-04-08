import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../types/navigation';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { usePregnancyDetailMutation } from '../../../api/hooks/usePregnancyApi';

type PregnancyDetailNavProp = NativeStackNavigationProp<AuthStackParamList, 'PregnancyDetail'>;

export const usePregnancyDetail = () => {
  const navigation = useNavigation<PregnancyDetailNavProp>();
  const { mutate: submitForm, isPending } = usePregnancyDetailMutation(navigation);

  const [isFirstBaby, setIsFirstBaby] = useState<boolean | null>(null);
  const [lmpDate, setLmpDate] = useState<string>('');
  const [dateObj, setDateObj] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [complications, setComplications] = useState<string[]>([]);

  const isValid = isFirstBaby !== null && lmpDate.length > 0;

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate && event.type !== 'dismissed') {
      setDateObj(selectedDate);
      const yyyy = selectedDate.getFullYear();
      const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const dd = String(selectedDate.getDate()).padStart(2, '0');
      // Format correctly based on expected API "2026-03-01" input
      setLmpDate(`${yyyy}-${mm}-${dd}`);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const toggleComplication = (comp: string) => {
    setComplications((prev) =>
      prev.includes(comp) ? prev.filter((c) => c !== comp) : [...prev, comp]
    );
  };

  const handleContinue = () => {
    if (!isValid || isPending) return;

    // Send only required stage-1 details
    submitForm({
      is_first_baby: isFirstBaby,   
    lmp_date: lmpDate,         
    complications: complications
    });
  };

  return {
    isFirstBaby,
    setIsFirstBaby,
    lmpDate,
    setLmpDate,
    dateObj,
    showDatePicker,
    setShowDatePicker,
    onDateChange,
    complications,
    toggleComplication,
    handleBack,
    handleContinue,
    isValid,
    isPending,
  };
};

