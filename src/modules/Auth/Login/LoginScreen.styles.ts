// src/modules/Auth/Login/LoginScreen.styles.ts

import { StyleSheet } from 'react-native';
import { Colors } from '../../../config/colors';
import { Spacing, Padding } from '../../../config/spacing';
import { rf } from '../../../utils/responsiveFont';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white_bg,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: Padding.screenHorizontal,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },

  // ── Sections ───────────────────────────────────────────────────
  headerSection: {
    alignItems: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.xxl,
  },
  welcomeSection: {
    marginBottom: Spacing.xl,
  },
  socialProofSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaSection: {
    marginTop: 37,
    marginBottom: Spacing.lg,
  },

  // ── Footer ─────────────────────────────────────────────────────
  footerSection: {
    paddingHorizontal: Padding.screenHorizontal,
    paddingVertical: Spacing.md,
  },
  termsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  // ── Text ───────────────────────────────────────────────────────
  welcomeTitle: {
    fontFamily: 'Larken-Medium',
    fontSize: rf(38, 28, 46),
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: rf(38, 28, 46) * 1.18,
    marginBottom: Spacing.margin_14,
  },
  subtitle: {
    fontFamily: 'IS-Regular',
    fontSize: rf(16, 13, 20),
    color: Colors.black70,
    textAlign: 'center',
  },
  socialProofText: {
    fontFamily: 'IS-Regular',
    fontSize: rf(12, 10, 15),
    color: '#000000',
    marginLeft: 8,
  },
  socialProofBold: {
    fontFamily: 'IS-Bold',
    fontSize: 12,
    color: '#000000',
    marginHorizontal: 2,
  },
  termsPrefix: {
    fontFamily: 'IS-Regular',
    fontSize: rf(12, 10, 15),
    color: Colors.black70,
  },
  termsLink: {
    fontFamily: 'IS-Medium',
    fontSize: rf(12, 10, 15),
    color: Colors.primary,
    marginLeft: 2,
  },
  errorText: {
    fontFamily: 'IS-Regular',
    fontSize: rf(14, 12, 17),
    color: '#B71C1C',
    textAlign: 'center',
    marginBottom: 12,
  },
});