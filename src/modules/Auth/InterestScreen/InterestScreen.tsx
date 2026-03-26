import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useInterestScreen } from './useInterestScreen';
import BackIcon from '../../../assets/icons/ic_back.svg';
import { Colors } from '../../../config/colors';
import { Spacing } from '../../../config/spacing';

export default function InterestScreen() {
  const { handleBack } = useInterestScreen();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <View style={styles.backContent}>
          <BackIcon width={12} height={12} />
          <Text style={styles.backText}>Back</Text>
        </View>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>What Are Your Interests</Text>
        <Text style={styles.subtitle}>
          Please select your interests to continue.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backButton: {
    marginLeft: Spacing.md,
    marginTop: Spacing.md,
  },
  backContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.primaryGreen,
    fontFamily: 'IS-Regular',
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  subtitle: {
    marginTop: Spacing.sm,
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
