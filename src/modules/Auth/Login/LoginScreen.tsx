// src/modules/Auth/Login/LoginScreen.tsx

import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  useWindowDimensions,
} from 'react-native';
import { styles } from './LoginScreen.styles';
import { useLoginScreen } from './useLoginScreen';
import { Strings } from '../../../config/strings';

// Components
import Button from '../../../components/ui/Button/Button';
import AvatarGroup from '../../../components/ui/AvatarGroup/AvatarGroup';

// Assets
import AppLogo from '../../../assets/images/app_logo_with_text.svg';
import GoogleIcon from '../../../assets/icons/google_icon.svg';
import Avatar1 from '../../../assets/images/avatar1.svg';
import Avatar2 from '../../../assets/images/avatar2.svg';
import Avatar3 from '../../../assets/images/avatar3.svg';

// ── Avatar data — defined outside component (no re-create on render)
const AVATARS = [
  <Avatar3 width={36} height={36} />,
  <Avatar2 width={36} height={36} />,
  <Avatar1 width={36} height={36} />,
];

export default function LoginScreen() {
  const { height } = useWindowDimensions();
  const {
    isLoading,
    error,
    handleGoogleLogin,
    handleTermsPress,
  } = useLoginScreen();

  return (
    <View style={[styles.container, { minHeight: height }]}>

      {/* ── Scrollable Content ──────────────────────────────── */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.headerSection}>
          <AppLogo width={148} height={112} />
        </View>

        {/* Welcome Text */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>
            {Strings.login.welcome}
          </Text>
          <Text style={styles.subtitle}>
            {Strings.login.subtitle}
          </Text>
        </View>

        {/* Social Proof */}
        <View style={styles.socialProofSection}>
          <AvatarGroup size="lg" count={3} svgImages={AVATARS} />
          <Text style={styles.socialProofText}>Joined by </Text>
          <Text style={styles.socialProofBold}>10k+</Text>
          <Text style={styles.socialProofText}> happy mothers</Text>
        </View>

        {/* Error Message */}
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}

        {/* Google Login Button */}
        <View style={styles.ctaSection}>
          <Button
            onPress={handleGoogleLogin}
            title={Strings.login.googleButton}
            variant="outline"
            size="lg"
            loading={isLoading}
            icon={<GoogleIcon width={18} height={18} />}
            fontFamily="IS-SemiBold"
            fontSize={14}
            textColor="#000000"
            borderColor="#E2E8F0"
            borderWidth={1}
            backgroundColor="#FFFFFF"
            iconGap={6}
            shadowOpacity={0.08}
          />
        </View>
      </ScrollView>

      {/* ── Footer ─────────────────────────────────────────── */}
      <View style={styles.footerSection}>
        <View style={styles.termsContainer}>
          <Text style={styles.termsPrefix}>
            {Strings.login.termsPrefix}
          </Text>
          <TouchableOpacity
            onPress={handleTermsPress}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.termsLink}>
              {Strings.login.termsLink}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}