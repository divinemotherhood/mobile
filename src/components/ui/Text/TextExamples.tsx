/**
 * Text Component Usage Examples
 * This file shows how to use the flexible Text component
 * with direct font family control, custom sizes, colors, etc.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../Text/Text';
import { Colors } from '../../../config/colors';
import { Spacing } from '../../../config/spacing';

// Example usage of the flexible Text component
export default function TextExamples() {
  return (
    <View style={styles.container}>

      {/* Font Family Examples */}
      <Text family="regular" size="base">Regular Font</Text>
      <Text family="medium" size="base">Medium Font</Text>
      <Text family="semibold" size="base">Semibold Font</Text>
      <Text family="bold" size="base">Bold Font</Text>

      {/* Font Size Examples */}
      <Text family="regular" size="xs">Extra Small Text</Text>
      <Text family="regular" size="sm">Small Text</Text>
      <Text family="regular" size="base">Base Text</Text>
      <Text family="regular" size="lg">Large Text</Text>
      <Text family="regular" size="xl">Extra Large Text</Text>
      <Text family="regular" size="xxl">2X Large Text</Text>
      <Text family="regular" size="xxxl">3X Large Text</Text>
      <Text family="regular" size="display">Display Text</Text>

      {/* Custom Font Size */}
      <Text family="bold" size={28}>Custom Size 28px</Text>
      <Text family="regular" size={16} lineHeight={24}>Custom Size with Line Height</Text>

      {/* Color Examples */}
      <Text family="regular" size="base" color="primary">Primary Color</Text>
      <Text family="regular" size="base" color="primary">Primary Blue</Text>
      <Text family="regular" size="base" color="primaryGreen">Primary Green</Text>
      <Text family="regular" size="base" color="textPrimary">Text Primary</Text>
      <Text family="regular" size="base" color="textSecondary">Text Secondary</Text>
      <Text family="regular" size="base" color="#FF6B6B">Custom Hex Color</Text>

      {/* Alignment Examples */}
      <Text family="regular" size="base" align="left">Left Aligned</Text>
      <Text family="regular" size="base" align="center">Center Aligned</Text>
      <Text family="regular" size="base" align="right">Right Aligned</Text>

      {/* Letter Spacing */}
      <Text family="regular" size="base" letterSpacing={1}>Normal Spacing</Text>
      <Text family="regular" size="base" letterSpacing={2}>Wide Spacing</Text>
      <Text family="regular" size="base" letterSpacing={-0.5}>Tight Spacing</Text>

      {/* Combined Examples */}
      <Text
        family="bold"
        size="xl"
        color="primary"
        align="center"
        letterSpacing={0.5}
        lineHeight={32}
      >
        Complex Typography Example
      </Text>

      {/* Legacy Support (still works) */}
      <Text variant="h1">Legacy H1 (maps to bold, display size)</Text>
      <Text variant="body">Legacy Body (maps to regular, base size)</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    backgroundColor: Colors.white,
  },
});