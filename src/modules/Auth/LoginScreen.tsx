/**
 * Login Screen
 * First authentication screen with Google login
 * Features: Welcome message, social proof, and OAuth integration
 */

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Logo from '../../components/ui/Logo/Logo';
import Button from '../../components/ui/Button/Button';
import Text from '../../components/ui/Text/Text';
import AvatarGroup from '../../components/ui/AvatarGroup/AvatarGroup';
import { Colors } from '../../config/colors';
import { Spacing, Padding } from '../../config/spacing';
import { Strings } from '../../config/strings';
import { RootStackParamList } from '../../types/navigation';
import AppLogo from '../../assets/images/app_logo_with_text.svg';
import GoogleIcon  from '../../assets/icons/google_icon.svg';
type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { height } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement Google Sign-In integration
      // For now, just simulate a delay and navigate to Home
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
      // navigation.replace('Home');
    } catch (error) {
      console.error('Google Sign-In error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTermsPress = () => {
    // TODO: Open Terms of Service modal or navigate to terms screen
    console.log('Open Terms of Service');
  };

  return (
    <View style={[styles.container, { minHeight: height }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      >
        {/* Header section with logo */}
        <View style={styles.headerSection}>
          <AppLogo width={148} height={112} />
        </View>

        {/* Welcome section */}
        <View style={styles.welcomeSection}>
          <Text
            variant="h2"
            color="textPrimary"
            align="center"
            weight="bold"
            style={styles.welcomeTitle}
          >
            {Strings.login.welcome}
          </Text>

          <Text
            variant="body"
            color="textSecondary"
            align="center"
            style={styles.subtitle}
          >
            {Strings.login.subtitle}
          </Text>
        </View>

        {/* Social proof section */}
        <View style={styles.socialProofSection}>
          <AvatarGroup size="md" count={3} />
          <Text
            variant="caption"
            color="textSecondary"
            style={styles.socialProofText}
          >
            {Strings.login.socialProof}
          </Text>
        </View>

        {/* CTA Button section */}
        <View style={styles.ctaSection}>
          <Button
            onPress={handleGoogleLogin}
            title={Strings.login.googleButton}
            variant="outline"
            size="lg"
            loading={isLoading}
            icon={<GoogleIcon width={20} height={20} style={{ marginRight: 8 }} />}
          />
        </View>
      </ScrollView>

      {/* Footer with terms link */}
      <View style={styles.footerSection}>
        <View style={styles.termsContainer}>
          <Text variant="caption" color="textSecondary">
            {Strings.login.termsPrefix}
          </Text>
          <TouchableOpacity
            onPress={handleTermsPress}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text
              variant="caption"
              color="primary"
              weight="semibold"
              style={styles.termsLink}
            >
              {Strings.login.termsLink}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white_bg,
    paddingBottom: 0,
  },
  scrollContent: {
    paddingHorizontal: Padding.screenHorizontal,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  welcomeSection: {
    marginBottom: Spacing.xxl,
  },
  welcomeTitle: {
    marginBottom: Spacing.md,
    lineHeight: 32, // Better line height for multi-line text
  },
  subtitle: {
    lineHeight: 24,
  },
  socialProofSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xxl,
 
  },
  socialProofText: {
    flex: 1,
    textAlign: 'right',
     },
  ctaSection: {
    marginBottom: Spacing.lg,
  },
  footerSection: {
    paddingHorizontal: Padding.screenHorizontal,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.white,
  },
  termsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  termsLink: {
    marginLeft: 4,
    textDecorationLine: 'underline',
  },
});
