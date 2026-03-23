/**
 * Logo Component
 * Displays the Divine Motherhood logo with icon and text
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../config/colors';
import { Spacing, BorderRadius } from '../../../config/spacing';
import { Typography } from '../../../config/typography';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showSubtext?: boolean;
}

export default function Logo({ size = 'medium', showSubtext = true }: LogoProps) {
  const sizeConfig = {
    small: {
      icon: 32,
      text: Typography.fontSize.base,
      subtext: Typography.fontSize.xs,
    },
    medium: {
      icon: 48,
      text: Typography.fontSize.xl,
      subtext: Typography.fontSize.sm,
    },
    large: {
      icon: 64,
      text: Typography.fontSize.xxxl,
      subtext: Typography.fontSize.base,
    },
  };

  const config = sizeConfig[size];

  return (
    <View style={styles.container}>
      {/* Logo Icon - Heart with leaves */}
      <View
        style={[
          styles.iconContainer,
          { width: config.icon, height: config.icon },
        ]}
      >
        <Text style={{ fontSize: config.icon * 0.6, color: Colors.primary }}>
          💚
        </Text>
      </View>

      {/* Logo Text */}
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.appName,
            { fontSize: config.text, fontWeight: '600' },
          ]}
        >
          Divine Motherhood
        </Text>

        {showSubtext && (
          <Text
            style={[
              styles.subtext,
              { fontSize: config.subtext },
            ]}
          >
            Life Within - Care Around
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.sm,
  },
  textContainer: {
    alignItems: 'center',
    marginHorizontal: Spacing.sm,
  },
  appName: {
    color: Colors.textPrimary,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  subtext: {
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    fontWeight: '400',
  },
});
