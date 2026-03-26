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

export default function ProfileScreen() {

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
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        
 <View style={styles.headerSection}>
          <AppLogo width={148} height={112} />
        </View>
<RNText style={styles.title}>
  {Strings.profile.titlePrefix}
  <RNText style={styles.titleAccent}>{Strings.profile.titleHighlight}</RNText>
</RNText>
        <View style={styles.avatarWrap}>
          <View style={styles.avatarCircle}>
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
            style={styles.verifyButton}
            onPress={handleVerify}        // ← was onPress={() => {}}
          >
            <RNText style={styles.verifyButtonText}>{Strings.profile.verifyButton}</RNText>
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
    paddingHorizontal: 30,
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
   paddingHorizontal:30},
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
  titleAccent: {
    fontFamily:'Larken-Medium',
    fontSize: 26,
  color: Colors.primaryGreen,  // or whatever accent color you want
},
  title: {
    marginTop: 20,
     fontFamily: 'Larken-Medium',
    fontSize: 26,
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
    fontSize: 12,
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
    fontSize: 12,
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
    fontSize: 12,
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
    fontSize: 12,
    color: Colors.black70,
    backgroundColor: Colors.textFieldBg,
  },
  verifyButton: {
    marginTop: 36,
    backgroundColor: Colors.primary,
    borderRadius: 4,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyButtonText: {
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
