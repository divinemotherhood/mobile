/**
 * FONT DEBUG SCREEN
 * This screen uses NATIVE React Native Text component (NOT custom Text component)
 * to isolate if the problem is with the font or the custom component
 * 
 * TEST RESULTS:
 * - If text shows Larken font: The PostScript name is correct, problem is in custom Text component
 * - If text falls back to system font: The PostScript name is WRONG
 */

import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text as RNText, // NATIVE React Native Text - COMMENT: Using native RN Text, not custom component
} from 'react-native';

export default function FontDebugScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* SECTION 1: Test with file name only (usually WRONG) */}
        <RNText style={styles.heading}>
          Test 1: Using file name 'Larken-Medium' (USUALLY FAILS)
        </RNText>
        <RNText style={[styles.testText, { fontFamily: 'Larken-Medium' }]}>
          {/* COMMENT: This is the name you're currently using - likely WRONG */}
          If this text looks bold/medium Larken, the PostScript name is 'Larken-Medium'
        </RNText>

        {/* SECTION 2: Test with possible variations */}
        <RNText style={styles.heading}>
          Test 2: Using just family name 'Larken' (COMMON FIX)
        </RNText>
        <RNText style={[styles.testText, { fontFamily: 'Larken' }]}>
          {/* COMMENT: Many fonts use just the family name without the weight suffix */}
          If this works, the PostScript name is just 'Larken'
        </RNText>

        {/* SECTION 3: Test Regular variant */}
        <RNText style={styles.heading}>
          Test 3: Using 'Larken-Regular' (another variant)
        </RNText>
        <RNText style={[styles.testText, { fontFamily: 'Larken-Regular' }]}>
          {/* COMMENT: Test the Regular variant to understand naming pattern */}
          This should show Regular weight if linked correctly
        </RNText>

        {/* SECTION 4: Test Bold variant */}
        <RNText style={styles.heading}>
          Test 4: Using 'Larken-Bold' (another variant)
        </RNText>
        <RNText style={[styles.testText, { fontFamily: 'Larken-Bold' }]}>
          {/* COMMENT: Test the Bold variant to see if Bold works (understanding naming) */}
          This should show Bold weight if linked correctly
        </RNText>

        {/* SECTION 5: Test the custom IS fonts to see what works */}
        <RNText style={styles.heading}>
          Test 5: Using 'IS-Medium' (comparison - this WORKS)
        </RNText>
        <RNText style={[styles.testText, { fontFamily: 'IS-Medium' }]}>
          {/* COMMENT: The IS font family works - compare how it looks vs Larken */}
          This IS-Medium font should DEFINITELY work (already verified)
        </RNText>

        {/* SECTION 6: Instructions */}
        <View style={styles.instructionsBox}>
          <RNText style={styles.instructionsTitle}>DEBUGGING INSTRUCTIONS:</RNText>
          <RNText style={styles.instruction}>
            {/* COMMENT: Step 1 - Find the real PostScript name */}
            1. Right-click Larken-Medium.ttf → Properties → Details tab
          </RNText>
          <RNText style={styles.instruction}>
            {/* COMMENT: Step 2 - Look for the PostScript Name field */}
            2. Look for "Font name" or "PostScript Name" field
          </RNText>
          <RNText style={styles.instruction}>
            {/* COMMENT: Step 3 - Replace the fontFamily value with the correct PostScript name */}
            3. Replace 'Larken-Medium' with the actual PostScript name in typography.ts
          </RNText>
          <RNText style={styles.instruction}>
            {/* COMMENT: Step 4 - Rebuild both platforms */}
            4. Rebuild: Run 'npx react-native run-android' or rebuild iOS
          </RNText>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 8,
    color: '#333',
  },
  testText: {
    // COMMENT: Base style - fontFamily will be overridden in each test
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  instructionsBox: {
    // COMMENT: Container for debugging instructions
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 8,
    marginTop: 32,
    marginBottom: 40,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#2E7D32',
  },
  instruction: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
    color: '#1B5E20',
  },
});
