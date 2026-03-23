/**
 * AvatarGroup Component
 * Displays a group of avatar images with overlap effect
 */

import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Spacing, BorderRadius } from '../../../config/spacing';
import { Colors } from '../../../config/colors';

interface AvatarGroupProps {
  size?: 'sm' | 'md' | 'lg';
  count?: number;
  style?: StyleProp<ViewStyle>;
}

const AVATAR_COLORS = [
  '#FFB6C1', // Light pink
  '#FFD700', // Gold
  '#87CEEB', // Sky blue
  '#DDA0DD', // Plum
];

export default function AvatarGroup({
  size = 'md',
  count = 3,
  style,
}: AvatarGroupProps) {
  const sizeConfig = {
    sm: { width: 24, height: 24 },
    md: { width: 32, height: 32 },
    lg: { width: 40, height: 40 },
  };

  const config = sizeConfig[size];
  const overlap = config.width / 2;

  return (
    <View
      style={[
        styles.container,
        { width: config.width * count - overlap * (count - 1) },
        style,
      ]}
    >
      {Array.from({ length: Math.min(count, 3) }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.avatarContainer,
            {
              width: config.width,
              height: config.height,
              marginLeft: index === 0 ? 0 : -overlap,
              zIndex: count - index,
            },
          ]}
        >
          {/* Placeholder avatar - replace with Image when needed */}
          <View
            style={[
              styles.avatar,
              {
                width: config.width,
                height: config.height,
                backgroundColor: AVATAR_COLORS[index % AVATAR_COLORS.length],
              },
            ]}
          >
            {/* Placeholder for avatar initials or image */}
          </View>
        </View>
      ))}

      {count > 3 && (
        <View
          style={[
            styles.avatarContainer,
            {
              width: config.width,
              height: config.height,
              marginLeft: -overlap,
              zIndex: 0,
            },
          ]}
        >
          <View
            style={[
              styles.avatar,
              {
                width: config.width,
                height: config.height,
                backgroundColor: Colors.border,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
          >
            {/* This would show +X more */}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    overflow: 'hidden',
  },
  avatar: {
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.border,
    borderWidth: 2,
    borderColor: Colors.white,
  },
});
