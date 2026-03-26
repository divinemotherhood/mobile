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
  images?: any[];
  svgImages?: React.ReactNode[];
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
  images = [], 
   svgImages = [],     // ✅ add this
  style,
}: AvatarGroupProps) {
  const sizeConfig = {
    sm: { width: 24, height: 24 },
    md: { width: 32, height: 32 },
    lg: { width: 36, height: 36 },
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
              borderRadius: config.width / 2,
              marginLeft: index === 0 ? 0 : -overlap,
            },
          ]}
        >
          {/* SVG image */}
          {svgImages[index] ? (
            <View style={{
              width: config.width,
              height: config.height,
              borderRadius: config.width / 2,
              overflow: 'hidden',
              borderWidth: 0,
              borderColor: Colors.white,
            }}>
              {svgImages[index]}
            </View>

          // PNG/JPG image
          ) :images[index] ? (
            <Image
              source={images[index]}
              style={{
                width: config.width,
                height: config.height,
                borderRadius: config.width / 2,
                borderWidth: 2,
                borderColor: Colors.white,
              }}
            />
          ) : (
            <View
              style={[
                styles.avatar,
                {
                  width: config.width,
                  height: config.height,
                  backgroundColor: AVATAR_COLORS[index % AVATAR_COLORS.length],
                },
              ]}
            />
          )}
        </View>
      ))}
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
    
    borderWidth: 2,
    borderColor: Colors.white,
  },
});
