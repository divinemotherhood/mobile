import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Platform, ScrollView, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  request,
  requestNotifications,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import { CommonActions } from '@react-navigation/native';
import { useAuthStore } from '../../../store/useAuthStore';
import { AuthStackParamList } from '../../../types/navigation';

type AuthNavProp = NativeStackNavigationProp<AuthStackParamList>;

type PermissionKey = 'notification' | 'gallery' | 'camera' | 'location';

type PermissionItem = {
  key: PermissionKey;
  title: string;
  description: string;
  icon: string;
  status: 'idle' | 'granted' | 'denied' | 'blocked';
};

const PERMISSIONS_LIST: PermissionItem[] = [
  {
    key: 'notification',
    title: 'Notifications',
    description: 'Stay updated with pregnancy tips and reminders',
    icon: '🔔',
    status: 'idle',
  },
  {
    key: 'gallery',
    title: 'Gallery Access',
    description: 'Save and share your precious moments',
    icon: '🖼️',
    status: 'idle',
  },
  {
    key: 'camera',
    title: 'Camera Access',
    description: 'Capture special memories during your journey',
    icon: '📷',
    status: 'idle',
  },
  {
    key: 'location',
    title: 'Location Access',
    description: 'Find nearby hospitals and healthcare providers',
    icon: '📍',
    status: 'idle',
  },
];

export default function PermissionScreen() {
  const navigation = useNavigation<AuthNavProp>();
//   const setHasCompletedPermissions = useAuthStore(
//     (state) => state.setHasCompletedPermissions
//   );

  const [permissions, setPermissions] = useState<PermissionItem[]>(PERMISSIONS_LIST);
  const [isRequesting, setIsRequesting] = useState(false);

  const updateStatus = (key: PermissionKey, status: PermissionItem['status']) => {
    setPermissions((prev) =>
      prev.map((p) => (p.key === key ? { ...p, status } : p))
    );
  };

  const requestPermission = async (key: PermissionKey) => {

    // ── Notifications ──────────────────────────────────────
    if (key === 'notification') {
      if (Platform.OS === 'ios') {
        // ✅ iOS — requestNotifications() is the correct API
        const { status } = await requestNotifications(['alert', 'sound', 'badge']);
        updateStatus(key, status === 'granted' ? 'granted' : 'denied');
      } else {
        // ✅ Android below API 33 — no runtime permission needed
        updateStatus(key, 'granted');
      }
      return;
    }

    // ── Gallery / Camera / Location ────────────────────────
    const permission = Platform.select({
      ios: {
        gallery:  PERMISSIONS.IOS.PHOTO_LIBRARY,
        camera:   PERMISSIONS.IOS.CAMERA,
        location: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }[key],
      android: {
        gallery:  PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        camera:   PERMISSIONS.ANDROID.CAMERA,
        location: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      }[key],
    });

    if (!permission) return;

    const result = await request(permission);

    if (result === RESULTS.GRANTED) {
      updateStatus(key, 'granted');
    } else if (result === RESULTS.BLOCKED) {
      updateStatus(key, 'blocked');
      Alert.alert(
        'Permission Blocked',
        `Please enable ${key} permission in Settings to use this feature.`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: openSettings },
        ]
      );
    } else {
      updateStatus(key, 'denied');
    }
  };

  const handleRequestAll = async () => {
    setIsRequesting(true);
    for (const item of permissions) {
      if (item.status !== 'granted') {
        await requestPermission(item.key);
      }
    }
    setIsRequesting(false);
  };

  const handleContinue = () => {
    //setHasCompletedPermissions(true);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Main' as never }],
      })
    );
  };

  const getStatusColor = (status: PermissionItem['status']) => {
    switch (status) {
      case 'granted': return '#4CAF50';
      case 'denied':  return '#FF5252';
      case 'blocked': return '#FF9800';
      default:        return '#B388FF';
    }
  };

  const getStatusLabel = (status: PermissionItem['status']) => {
    switch (status) {
      case 'granted': return '✓ Granted';
      case 'denied':  return '✗ Denied';
      case 'blocked': return '⚠ Blocked';
      default:        return 'Allow';
    }
  };

  const allGranted = permissions.every((p) => p.status === 'granted');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        <Text style={styles.title}>App Permissions</Text>
        <Text style={styles.subtitle}>
          We need these permissions to give you the best experience
          on your motherhood journey.
        </Text>

        {permissions.map((item) => (
          <View key={item.key} style={styles.permissionCard}>
            <View style={styles.permissionLeft}>
              <Text style={styles.permissionIcon}>{item.icon}</Text>
              <View style={styles.permissionInfo}>
                <Text style={styles.permissionTitle}>{item.title}</Text>
                <Text style={styles.permissionDesc}>{item.description}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.allowBtn,
                { backgroundColor: getStatusColor(item.status) },
              ]}
              onPress={() => requestPermission(item.key)}
              disabled={item.status === 'granted'}
            >
              <Text style={styles.allowBtnText}>
                {getStatusLabel(item.status)}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          style={[styles.requestAllBtn, (isRequesting || allGranted) && { opacity: 0.6 }]}
          onPress={handleRequestAll}
          disabled={isRequesting || allGranted}
        >
          <Text style={styles.requestAllText}>
            {isRequesting ? 'Requesting...' : 'Allow All Permissions'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
          <Text style={styles.continueBtnText}>
            {allGranted ? 'Continue to App' : 'Skip & Continue'}
          </Text>
        </TouchableOpacity>

        {!allGranted && (
          <Text style={styles.skipNote}>
            You can enable permissions later from Settings
          </Text>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FE' },
  content: { padding: 24, paddingBottom: 40 },
  title: {
    fontSize: 28, fontWeight: '700',
    color: '#1A1A1A', marginBottom: 8,
    fontFamily: 'Larken-Bold',
  },
  subtitle: { fontSize: 15, color: '#666', lineHeight: 22, marginBottom: 32 },
  permissionCard: {
    backgroundColor: '#FFF', borderRadius: 14, padding: 16,
    marginBottom: 12, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', elevation: 2,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 6,
  },
  permissionLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  permissionIcon: { fontSize: 28, marginRight: 12 },
  permissionInfo: { flex: 1 },
  permissionTitle: { fontSize: 15, fontWeight: '600', color: '#1A1A1A' },
  permissionDesc: { fontSize: 12, color: '#888', marginTop: 2, lineHeight: 16 },
  allowBtn: { borderRadius: 8, paddingHorizontal: 14, paddingVertical: 8, marginLeft: 8 },
  allowBtnText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
  requestAllBtn: {
    backgroundColor: '#B388FF', borderRadius: 12,
    paddingVertical: 14, alignItems: 'center', marginTop: 24,
  },
  requestAllText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  continueBtn: {
    borderRadius: 12, paddingVertical: 14, alignItems: 'center',
    marginTop: 12, borderWidth: 1.5, borderColor: '#B388FF',
  },
  continueBtnText: { color: '#B388FF', fontSize: 16, fontWeight: '600' },
  skipNote: { textAlign: 'center', color: '#AAA', fontSize: 12, marginTop: 12 },
});