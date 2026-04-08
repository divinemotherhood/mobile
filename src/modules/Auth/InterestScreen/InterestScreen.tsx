import React from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { useInterestScreen } from './useInterestScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../config/colors';
import { Spacing } from '../../../config/spacing';
import AppLogo from '../../../assets/images/app_logo_with_text.svg';
import BackIcon from '../../../assets/icons/ic_back.svg';
import { Strings } from '../../../config/strings';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 3; // change 2 or 3 anytime
const SCREEN_PADDING = 60; // 30 left + 30 right
const GAP = 15;

const CARD_WIDTH =
  (width - SCREEN_PADDING - GAP * (NUM_COLUMNS - 1)) / NUM_COLUMNS;
const ins = Strings.interestScreen;

export const INTEREST_OPTIONS = [
  { id: 'nutrition', title: ins.options.nutrition.title, subtitle: ins.options.nutrition.subtitle, imageUrl: 'https://picsum.photos/seed/nutrition/400/300' },
  { id: 'yoga', title: ins.options.yoga.title, subtitle: ins.options.yoga.subtitle, imageUrl: 'https://picsum.photos/seed/yoga/400/300' },
  { id: 'mental_health', title: ins.options.mentalHealth.title, subtitle: ins.options.mentalHealth.subtitle, imageUrl: 'https://picsum.photos/seed/mental/400/300' },
  { id: 'garbha_sanskar', title: ins.options.garbhaSanskar.title, subtitle: ins.options.garbhaSanskar.subtitle, imageUrl: 'https://picsum.photos/seed/garbha/400/300' },
  { id: 'birth_prep', title: ins.options.birthPrep.title, subtitle: ins.options.birthPrep.subtitle, imageUrl: 'https://picsum.photos/seed/birth/400/300' },
  { id: 'postpartum', title: ins.options.postpartum.title, subtitle: ins.options.postpartum.subtitle, imageUrl: 'https://picsum.photos/seed/postpartum/400/300' },
];

export default function InterestScreen() {
  const {
    selectedInterests,
    toggleInterest,
    handleBack,
    handleContinue,
  } = useInterestScreen();

  return (
    <SafeAreaView style={styles.screenRoot}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <View style={styles.backContent}>
          <BackIcon width={10} height={7} />
          <RNText style={styles.backText}>{ins.back}</RNText>
        </View>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <AppLogo width={148} height={112} />
        </View>

        <RNText style={styles.title}>
          {ins.titlePrefix}<RNText style={styles.titleAccent}>{ins.titleHighlight}</RNText>
        </RNText>
        <RNText style={styles.subtitle}>
          {ins.subtitle}
        </RNText>

        <View style={styles.gridContainer}>
          {INTEREST_OPTIONS.map((opt) => {
            const isSelected = selectedInterests.includes(opt.id);
            return (
              <TouchableOpacity
                key={opt.id}
                style={[styles.card, isSelected && styles.cardActive]}
                onPress={() => toggleInterest(opt.id)}
                activeOpacity={0.8}
              >
                <Image source={{ uri: opt.imageUrl }} style={styles.cardImage} />
                <View style={[styles.cardContent, isSelected && styles.cardContentActive]}>
                  <RNText style={styles.cardTitle} numberOfLines={1}>{opt.title}</RNText>
                  <RNText style={styles.cardSubtitle} numberOfLines={2}>{opt.subtitle}</RNText>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <RNText style={styles.continueButtonText}>{ins.continueButton}</RNText>
        </TouchableOpacity>

        <RNText style={styles.helperText}>
          {ins.helperText}
        </RNText>
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
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 30,
    gap: 15,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.textFieldBg,
    overflow: 'hidden',
  },
  cardActive: {
    borderColor: Colors.primary,
  },
  cardImage: {
    width: '100%',
    height: 78,
    resizeMode: 'cover',
  },
  cardContent: {
    paddingVertical: 12,
    paddingHorizontal: 6,
    backgroundColor: Colors.white,
    flex: 1,
    justifyContent: 'center',
  },
  cardContentActive: {
    backgroundColor: Colors.textFieldBg, // Colors.primaryLight
  },
  cardTitle: {
    fontFamily: 'IS-Bold',
    fontSize: 10,
    color: Colors.black70,
    marginBottom: 3,
  },
  cardSubtitle: {
    fontFamily: 'IS-Regular',
    fontSize: 8,
    color: Colors.black70,
    lineHeight: 8,
  },
  continueButton: {
    width: '100%',
    marginTop: 35,
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
