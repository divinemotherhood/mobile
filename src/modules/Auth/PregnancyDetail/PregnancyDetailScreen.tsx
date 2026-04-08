import React from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
import { usePregnancyDetail } from './usePregnancyDetail';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../config/colors';
import { Spacing } from '../../../config/spacing';
import { Strings } from '../../../config/strings';
import AppLogo from '../../../assets/images/app_logo_with_text.svg';
import BackIcon from '../../../assets/icons/ic_back.svg';
import CalendarIcon from '../../../assets/icons/ic_calendar.svg';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function PregnancyDetailScreen() {
  const {
    isFirstBaby,
    setIsFirstBaby,
    lmpDate,
    dateObj,
    showDatePicker,
    setShowDatePicker,
    onDateChange,
    complications,
    toggleComplication,
    handleBack,
    handleContinue,
  } = usePregnancyDetail();

  const pd = Strings.pregnancyDetail;

  const COMPLICATION_OPTIONS = [
    pd.options.gestationalDiabetes,
    pd.options.highBloodPressure,
    pd.options.morningSickness,
    pd.options.fatigue,
    pd.options.anxiety,
  ];

  return (
    <SafeAreaView style={styles.screenRoot}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <View style={styles.backContent}>
          <BackIcon width={10} height={7} />
          <RNText style={styles.backText}>{pd.back}</RNText>
        </View>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.headerSection}>
          <AppLogo width={148} height={112} />
        </View>

        <RNText style={styles.title}>
          {pd.titlePrefix}<RNText style={styles.titleAccent}>{pd.titleHighlight}</RNText>
        </RNText>
        <RNText style={styles.subtitle}>
          {pd.subtitleLine1}{'\n'}{pd.subtitleLine2}
        </RNText>

        <View style={styles.formSection}>
          <RNText style={styles.questionLabel}>{pd.qFirstBaby}</RNText>
          <View style={styles.yesNoRow}>
            <TouchableOpacity
              style={[
                styles.yesNoBtn,
                isFirstBaby === true ? styles.yesNoBtnActive : styles.yesNoBtnInactive
              ]}
              onPress={() => setIsFirstBaby(true)}
            >
              <RNText style={[
                styles.yesNoBtnText,
                isFirstBaby === true ? styles.yesNoTextActive : styles.yesNoTextInactive
              ]}>{pd.yes}</RNText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.yesNoBtn,
                isFirstBaby === false ? styles.yesNoBtnActive : styles.yesNoBtnInactive
              ]}
              onPress={() => setIsFirstBaby(false)}
            >
              <RNText style={[
                styles.yesNoBtnText,
                isFirstBaby === false ? styles.yesNoTextActive : styles.yesNoTextInactive
              ]}>{pd.no}</RNText>
            </TouchableOpacity>
          </View>

          <RNText style={styles.questionLabel}>
            {pd.qLmpDate}<RNText style={styles.asterisk}>*</RNText>
          </RNText>
          <TouchableOpacity 
            style={styles.dateInputContainer} 
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.7}
          >
            <CalendarIcon />
            <RNText style={[styles.dateInput, !lmpDate && { color: Colors.black70 }]}>
              {lmpDate || pd.datePlaceholder}
            </RNText>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dateObj}
              mode="date"
              display="default"
              onChange={onDateChange}
              maximumDate={new Date()}
            />
          )}

          <RNText style={styles.questionLabel}>
            {pd.qComplications}
          </RNText>
          <View style={styles.chipsContainer}>
            {COMPLICATION_OPTIONS.map((comp) => {
              const isSelected = complications.includes(comp);
              return (
                <TouchableOpacity
                  key={comp}
                  style={[styles.chip, isSelected && styles.chipActive]}
                  onPress={() => toggleComplication(comp)}
                >
                  <RNText style={[styles.chipText, isSelected && styles.chipTextActive]}>
                    {comp}
                  </RNText>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <RNText style={styles.continueButtonText}>{pd.continueButton}</RNText>
          </TouchableOpacity>

          <RNText style={styles.helperText}>
            {pd.helperText}
          </RNText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenRoot: {
    flex: 1,
    backgroundColor: '#FAFBFD',
  },
  container: {
    paddingHorizontal: 30,
    alignItems: 'center',
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: Spacing.md,
    paddingHorizontal: 30,
  },
  backContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 10,
    color: Colors.black70,
    fontFamily: 'IS-Medium',
    marginStart: Spacing.xs,
  },
  headerSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    marginTop: 20,
    fontFamily: 'Larken-Medium',
    fontSize: 26,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  titleAccent: {
    fontFamily: 'Larken-Medium',
    fontSize: 26,
    color: Colors.primaryGreen,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.black70,
    fontFamily: 'IS-Regular',
    textAlign: 'center',
    lineHeight: 20,
  },
  formSection: {
    width: '100%',
    marginTop: 0,
  },
  questionLabel: {
    color: Colors.black70,
    fontSize: 12,
    marginBottom: 8,
    fontFamily: 'IS-Regular',
    marginTop: 31,
  },
  asterisk: {
    color: Colors.error,
  },
  yesNoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 3,
    height: 40,
    borderRadius: 4,
    backgroundColor: Colors.primary12,
  },
  yesNoBtn: {
    flex: 1,
    height: 35,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yesNoBtnInactive: {
    backgroundColor: 'transparent',
  },
  yesNoBtnActive: {
    backgroundColor: Colors.primary,
  },
  yesNoBtnText: {
    fontSize: 12,
    fontFamily: 'IS-Regular',
  },
  yesNoTextInactive: {
    color: Colors.black70,
  },
  yesNoTextActive: {
    color: Colors.white,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 4,
    paddingHorizontal: 12,
    backgroundColor: Colors.textFieldBg,
  },
  dateInput: {
    flex: 1,
    fontSize: 12,
    color: Colors.textPrimary,
    fontFamily: 'IS-Regular',
    marginLeft: 8,
    textAlignVertical: 'center',
    paddingTop: 0,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  chip: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.textFieldBg,
  },
  chipActive: {
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 12,
    color: Colors.black,
    fontFamily: 'IS-Regular',
  },
  chipTextActive: {
    color: Colors.black,
  },
  continueButton: {
    marginTop: 40,
    backgroundColor: Colors.primary,
    borderRadius: 4,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: 'IS-SemiBold',
  },
  helperText: {
    marginTop: 8,
    textAlign: 'center',
    color: Colors.black70,
    fontSize: 10,
    fontFamily: 'IS-Regular',
  },
});
