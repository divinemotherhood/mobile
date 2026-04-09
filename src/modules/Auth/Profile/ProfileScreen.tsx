// src/modules/Auth/Profile/ProfileScreen.tsx

import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text as RNText,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AvatarPlaceholder from '../../../assets/icons/ic_avatar_place_holder.svg';
import { useProfileScreen } from './useProfileScreen'; // ← import hook
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../config/colors';
import { Spacing, Padding } from '../../../config/spacing';
import AppLogo from '../../../assets/images/app_logo_with_text.svg';
import EditIcon from '../../../assets/icons/ic_imagePiker.svg';
import { Strings } from '../../../config/strings';
import BackIcon from '../../../assets/icons/ic_back.svg';
import ArrowDownIcon from '../../../assets/icons/ic_down_arrow.svg';
import Flag from '../../../assets/icons/ic_flag.svg';
import { useWindowDimensions } from 'react-native';
import { rf } from '../../../utils/responsiveFont';

export default function ProfileScreen() {
const { width, height } = useWindowDimensions();
const isTablet = width >= 768;
const isLandscape = width > height;
const logoWidth  = width * 0.35;
const logoHeight = logoWidth * (112 / 148);
const avatarSize = Math.min(width * 0.25, 100); 
  // ── All logic comes from hook ─────────────────────
  const {
    user,
    name, setName,
    email, setEmail,
    phone, setPhone,
    userImage,
    handleBack,
    handlePickImage,
    handleVerify,
    handleDemo,
    isValid,
    isPending,
  } = useProfileScreen();

  // ── Only UI here ──────────────────────────────────
  return (
    <SafeAreaView style={styles.screenRoot}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBack}
      >
        <View style={styles.backContent}>
          <BackIcon width={10} height={7} />
          <RNText style={styles.backText}>{Strings.profile.back}</RNText>
        </View>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={[styles.container, { paddingHorizontal: isTablet ? 60 : isLandscape ? 60 : 30 }]}
        keyboardShouldPersistTaps="handled"
      >

        <View style={styles.headerSection}>
          <AppLogo width={logoWidth} height={logoHeight} />
        </View>
        <RNText style={styles.title}>
          {Strings.profile.titlePrefix}
          <RNText style={styles.titleAccent}>{Strings.profile.titleHighlight}</RNText>
        </RNText>
        <View style={styles.avatarWrap}>
          <View style={[styles.avatarCircle, { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }]}>

            {userImage ? (
              <Image source={{ uri: userImage }} style={styles.avatarImage} />
            ) : (
              <AvatarPlaceholder
                width="135%"
                height="135%"
                style={{ marginTop: 31 }}
              />
            )}
          </View>
          <TouchableOpacity style={styles.avatarEditDot} onPress={handlePickImage}>
            <EditIcon width={28} height={28} />
          </TouchableOpacity>
        </View>

        <View style={styles.formCard}>
          <RNText style={styles.fieldLabel}>{Strings.profile.nameLabel}</RNText>
          <TextInput
            style={styles.inputField}
            value={name}
            onChangeText={setName}
            placeholder={Strings.profile.namePlaceholder}
            placeholderTextColor="#A0A0A0"
          />

          <RNText style={[styles.fieldLabel, { marginTop: 20 }]}>{Strings.profile.emailLabel}</RNText>
          <TextInput
            style={styles.inputField}
            value={email}
            onChangeText={setEmail}
            placeholder={Strings.profile.emailPlaceholder}
            placeholderTextColor="#A0A0A0"
            keyboardType="email-address"
          />

          <RNText style={[styles.fieldLabel, { marginTop: 20 }]}>
            {Strings.profile.phoneLabel}
          </RNText>
          <View style={styles.phoneRow}>
            <View style={styles.countryContainer}>
              <Flag width={23} height={17} />
              <RNText style={styles.countryCode}>+91</RNText>
              <ArrowDownIcon width={12} height={12} style={styles.arrowIcon} />
            </View>
            <TextInput
              style={styles.phoneInput}
              value={phone}
              onChangeText={setPhone}
              placeholder={Strings.profile.phonePlaceholder}
              placeholderTextColor="#A0A0A0"
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>

          <TouchableOpacity
            style={[styles.verifyButton, (!isValid || isPending) && { backgroundColor: Colors.textLight }]}
            onPress={handleVerify}
            disabled={!isValid || isPending}
          >
            <RNText style={styles.verifyButtonText}>
              {isPending ? 'Verifying...' : Strings.profile.verifyButton}
            </RNText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.verifyButton, { backgroundColor: '#B388FF', marginTop: 10 }]} 
            onPress={handleDemo}
          >
            <RNText style={styles.verifyButtonText}>
              VIEW FEATURES DEMO
            </RNText>
          </TouchableOpacity>

          <RNText style={styles.helperText}>
            {Strings.profile.helperText}
          </RNText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Styles stay in same file at bottom ───────────────
const styles = StyleSheet.create({
  screenRoot: {
    flex: 1,
    backgroundColor: '#FAFBFD',
  },
  container: {
    alignItems: 'center',
  },
  backIcon: {
    width: 20,       // adjust size
    height: 20,
    resizeMode: 'contain',
  },
  backContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: Spacing.md,
    paddingHorizontal: 30
  },
  backText: {
    fontSize: rf(10, 9, 13),
    color: Colors.black70,

    fontFamily: 'IS-Medium',
    textAlign: 'center',

    marginStart: Spacing.xs,

  },
  headerSection: {
    alignItems: 'center',
  },
  titleAccent: {
    fontFamily: 'Larken-Medium',
    fontSize: rf(26, 20, 32),
    color: Colors.primaryGreen,  // or whatever accent color you want
  },
  title: {
    marginTop: 20,
    fontFamily: 'Larken-Medium',
    fontSize: rf(26, 20, 32),
    color: Colors.textPrimary,

    textAlign: 'center',
  },
  avatarWrap: {
    marginBottom: 28,
    marginTop: 20,
    alignItems: 'center',
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8EDF6',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  placeholderWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarEditDot: {
    position: 'absolute',
    right: -0,
    bottom: -1,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEditText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  formCard: {
    width: '100%',
    borderRadius: 16,

  },
  fieldLabel: {
    marginTop: 25,
    color: Colors.black70,
    fontSize: rf(12, 10, 15),
    marginBottom: 6,
    fontFamily: 'IS-SemiBold',
  },
  inputField: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: rf(12, 10, 15),
    color: Colors.black70,
    backgroundColor: Colors.textFieldBg,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 6,
    backgroundColor: Colors.textFieldBg,
    paddingVertical: 13,
    paddingHorizontal: 9,
    marginRight: 8,
  },
  countryEmoji: {
    fontSize: 18,
    marginRight: 6,
  },
  countryCode: {
    fontSize: rf(12, 10, 15),
    marginStart: 8,
    fontFamily: 'IS-Regular',
    color: Colors.black,
  },
  arrowIcon: {
    marginStart: 4,
  },
  phoneInput: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize:  rf(12, 10, 15),
    color: Colors.black70,
    backgroundColor: Colors.textFieldBg,
  },
  verifyButton: {
    marginTop: 36,
    backgroundColor: Colors.primary,
    borderRadius: 4,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyButtonText: {
    color: Colors.white,
    fontSize: rf(14, 12, 17),
    fontFamily: 'IS-SemiBold',

  },
  helperText: {
    marginTop: 8,
    textAlign: 'center',
    color: Colors.black70,
    fontSize: rf(10, 9, 13),
    fontFamily: 'IS-Regular',
  },
});
