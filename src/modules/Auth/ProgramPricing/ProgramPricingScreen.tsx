import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text as RNText,
  TouchableOpacity,
  View,
} from 'react-native';
import { useProgramPricing } from './useProgramPricing';
import BackIcon from '../../../assets/icons/ic_back.svg';
import AppLogo from '../../../assets/images/app_logo_with_text.svg';
import { Colors } from '../../../config/colors';
import { Spacing } from '../../../config/spacing';

export default function ProgramPricingScreen() {
  const { handleBack } = useProgramPricing();
  const [selectedProgram, setSelectedProgram] = useState<'DS Pro' | 'DS Plus'>('DS Pro');
  const [selectedPlan, setSelectedPlan] = useState<'Monthly' | '3Months' | 'FullCare'>('Monthly');

  return (
    <SafeAreaView style={styles.screenRoot}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <View style={styles.backContent}>
          <BackIcon width={10} height={7} />
          <RNText style={styles.backText}>Back</RNText>
        </View>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        <View style={styles.headerSection}>
          <AppLogo width={148} height={112} />
        </View>
        <RNText style={styles.title}>
          Program <RNText style={styles.titleAccent}>Pricing</RNText>
        </RNText>
        <RNText style={styles.subtitle}>
          Choose your preferred program
        </RNText>

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, selectedProgram === 'DS Pro' && styles.toggleButtonActive]}
            onPress={() => setSelectedProgram('DS Pro')}
            activeOpacity={0.8}
          >
            <RNText style={[styles.toggleText, selectedProgram === 'DS Pro' && styles.toggleTextActive]}>DS Pro 👑</RNText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, selectedProgram === 'DS Plus' && styles.toggleButtonActive]}
            onPress={() => setSelectedProgram('DS Plus')}
            activeOpacity={0.8}
          >
            <RNText style={[styles.toggleText, selectedProgram === 'DS Plus' && styles.toggleTextActive]}>DS Plus</RNText>
          </TouchableOpacity>
        </View>

        <RNText style={styles.recommendationText}>
          We Recommend DS Pro for complete Care{'\n'}of you and your child.{' '}
          <RNText style={styles.viewDetailsText}>view details</RNText>
        </RNText>

        <View style={styles.plansContainer}>
          <TouchableOpacity
            style={[styles.planCard, selectedPlan === 'Monthly' && styles.planCardActive]}
            activeOpacity={0.8}
            onPress={() => setSelectedPlan('Monthly')}
          >
            <View style={styles.planCardHeader}>
              <View style={styles.planCardHeaderLeft}>
                <View style={[styles.radioOuter, selectedPlan === 'Monthly' && styles.radioOuterActive]}>
                  {selectedPlan === 'Monthly' && <View style={styles.radioInner} />}
                </View>
                <RNText style={styles.planTitle}>Monthly Plan</RNText>
              </View>
              <RNText style={styles.planPrice}>₹1,768</RNText>
            </View>
            <RNText style={styles.planSubtitle}>1490 x 1 Month (+ 18% GST)</RNText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.planCard, selectedPlan === '3Months' && styles.planCardActive]}
            activeOpacity={0.8}
            onPress={() => setSelectedPlan('3Months')}
          >
            <View style={styles.planCardHeader}>
              <View style={styles.planCardHeaderLeft}>
                <View style={[styles.radioOuter, selectedPlan === '3Months' && styles.radioOuterActive]}>
                  {selectedPlan === '3Months' && <View style={styles.radioInner} />}
                </View>
                <RNText style={styles.planTitle}>3 Months</RNText>
                <View style={styles.discountBadge}>
                  <RNText style={styles.discountText}>10% Off</RNText>
                </View>
              </View>
              <RNText style={styles.planPrice}>₹4125</RNText>
            </View>
            <RNText style={styles.planSubtitle}>1390 x 3 Month (+ 18% GST)</RNText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.planCard, selectedPlan === 'FullCare' && styles.planCardActive]}
            activeOpacity={0.8}
            onPress={() => setSelectedPlan('FullCare')}
          >
            <View style={styles.planCardHeader}>
              <View style={styles.planCardHeaderLeft}>
                <View style={[styles.radioOuter, selectedPlan === 'FullCare' && styles.radioOuterActive]}>
                  {selectedPlan === 'FullCare' && <View style={styles.radioInner} />}
                </View>
                <RNText style={styles.planTitle}>Full Care</RNText>
                <View style={styles.discountBadge}>
                  <RNText style={styles.discountText}>20% Off</RNText>
                </View>
              </View>
              <RNText style={styles.planPrice}>₹4128</RNText>
            </View>
            <RNText style={styles.planSubtitle}>890 x Months remaining till you delivery 🤍</RNText>
          </TouchableOpacity>
        </View>

        <RNText style={styles.footerText}>
          <RNText style={styles.footerTextBold}>Basis your LMP you have:</RNText> 7 months & 6 days{'\n'}
          If you wish to change your LMP please go back.
        </RNText>

        <TouchableOpacity style={styles.payButton}>
          <RNText style={styles.payButtonText}>Pay Securely</RNText>
        </TouchableOpacity>

        <RNText style={styles.secureText}>
          Your details are secured and will not be shared to anyone
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
    marginBottom: 5,
  },
  backContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 10,
    color: Colors.black70,
    fontFamily: 'IS-Medium',
    textAlign: 'center',
    marginStart: Spacing.xs,
  },
  headerSection: {
    alignItems: 'center',
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
    marginTop: 10,
    fontSize: 14,
    color: Colors.black70,
    fontFamily: 'IS-Regular',
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#E8EDF6',
    borderRadius: 6,
    marginTop: 20,
    padding: 2,
    width: '65%',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  toggleButtonActive: {
    backgroundColor: Colors.primary,
  },
  toggleText: {
    fontSize: 12,
    fontFamily: 'IS-Medium',
    color: Colors.black70,
  },
  toggleTextActive: {
    color: Colors.white,
  },
  recommendationText: {
    marginTop: 20,
    fontSize: 10,
    color: Colors.black70,
    fontFamily: 'IS-Regular',
    textAlign: 'center',
    lineHeight: 16,
  },
  viewDetailsText: {
    color: Colors.black70,
    fontFamily: 'IS-Medium',
  },
  plansContainer: {
    width: '100%',
    marginTop: 20,
  },
  planCard: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 6,
    padding: 16,
    backgroundColor: Colors.white,
    marginBottom: 12,
  },
  planCardActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  planCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  planCardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioOuterActive: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  planTitle: {
    fontSize: 14,
    fontFamily: 'IS-SemiBold',
    color: Colors.black,
  },
  discountBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  discountText: {
    fontSize: 8,
    fontFamily: 'IS-Medium',
    color: Colors.primary,
  },
  planPrice: {
    fontSize: 14,
    fontFamily: 'IS-SemiBold',
    color: Colors.black,
  },
  planSubtitle: {
    fontSize: 10,
    fontFamily: 'IS-Regular',
    color: Colors.textSecondary,
    marginLeft: 24,
  },
  footerText: {
    marginTop: 16,
    fontSize: 10,
    color: Colors.black70,
    fontFamily: 'IS-Regular',
    textAlign: 'center',
    lineHeight: 16,
  },
  footerTextBold: {
    fontFamily: 'IS-SemiBold',
  },
  payButton: {
    width: '100%',
    marginTop: 16,
    backgroundColor: Colors.primary,
    borderRadius: 6,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: 'IS-SemiBold',
  },
  secureText: {
    marginTop: 12,
    fontSize: 9,
    color: Colors.textSecondary,
    fontFamily: 'IS-Regular',
    textAlign: 'center',
  },
});
