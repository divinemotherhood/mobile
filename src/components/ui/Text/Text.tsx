/**
 * Text Component
 * Flexible typography component with direct font family control
 */

import React from 'react';
import {
  Text as RNText,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import { Colors, ColorType } from '../../../config/colors';
import { Typography } from '../../../config/typography';

export type FontFamily =
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'IS-Regular'
  | 'IS-Medium'
  | 'IS-SemiBold'
  | 'IS-Bold'
  | 'Larken-Regular'
  | 'Larken-Medium'
  | 'Larken-SemiBold'
  | 'Larken-Bold';
export type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | 'xxl' | 'xxxl' | 'display' |'larkenText' | number;
export type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold' | '400' | '500' | '600' | '700';

interface TextProps {
  children: React.ReactNode;
  // Typography props
  family?: FontFamily;
  size?: FontSize;
  weight?: FontWeight;
  // Styling props
  color?: ColorType | string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  // Additional styling
  lineHeight?: number;
  letterSpacing?: number;
  // React Native props
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  // Legacy support (deprecated)
  variant?: string; // Keep for backward compatibility
}

export default function Text({
  children,
  // Typography props
  family = 'regular',
  size = 'base',
  weight,
  // Styling props
  color = 'textPrimary',
  align = 'auto',
  // Additional styling
  lineHeight,
  letterSpacing,
  // React Native props
  style,
  numberOfLines,
  // Legacy support
  variant,
}: TextProps) {
  // Handle legacy variant support (map to new system)
  let finalFamily = family;
  let finalSize = size;
  let finalWeight = weight;

  if (variant) {
    // Map old variants to new system
    const variantMap: { [key: string]: { family: FontFamily; size: FontSize; weight: FontWeight } } = {
      h1: { family: 'bold', size: 'display', weight: 'bold' },
      h2: { family: 'bold', size: 'xxxl', weight: 'bold' },
      h3: { family: 'semibold', size: 'xl', weight: 'semibold' },
      subtitle: { family: 'medium', size: 'lg', weight: 'medium' },
      body: { family: 'regular', size: 'base', weight: 'regular' },
      caption: { family: 'regular', size: 'sm', weight: 'regular' },
      small: { family: 'regular', size: 'xs', weight: 'regular' },
    };

    const mappedVariant = variantMap[variant];
    if (mappedVariant) {
      finalFamily = mappedVariant.family;
      finalSize = mappedVariant.size;
      finalWeight = mappedVariant.weight;
    }
  }

  // Get font family
  const fontFamily = Typography.fontFamily[finalFamily] || 'System';

  // Get font size (in case size is passed from value or config)
  const fontSize = typeof finalSize === 'number' ? finalSize : Typography.fontSize[finalSize];

  // Get font weight if provided (defaults to 400 if not)
  const fontWeight = finalWeight;


  // Get text color
  const textColor = typeof color === 'string' ? color : Colors[color];

  // Calculate line height (use provided or default based on font size)
  const calculatedLineHeight = lineHeight || fontSize * Typography.lineHeight.normal;

  return (
    <RNText
      style={[
        {
          fontFamily,
          fontSize,
          fontWeight,
          color: textColor,
          textAlign: align,
          lineHeight: calculatedLineHeight,
          letterSpacing: letterSpacing || 0,
        },
        style,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({});
