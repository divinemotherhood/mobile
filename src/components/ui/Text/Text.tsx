/**
 * Text Component
 * Centralized text styling for consistency
 */

import React from 'react';
import {
  Text as RNText,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import { Colors,ColorType } from '../../../config/colors';
import { Typography } from '../../../config/typography';

export type TextVariant = 'h1' | 'h2' | 'h3' | 'subtitle' | 'body' | 'caption' | 'small';

interface TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  color?: ColorType | string;
  weight?: keyof typeof Typography.fontWeight;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}

const variantStyles: {
  [K in TextVariant]: {
    fontSize: number;
    lineHeight: number;
    fontWeight: '400' | '500' | '600' | '700';
  };
} = {
  h1: {
    fontSize: Typography.fontSize.display,
    lineHeight: Typography.fontSize.display * Typography.lineHeight.tight,
    fontWeight: Typography.fontWeight.bold,
  },
  h2: {
    fontSize: Typography.fontSize.xxxl,
    lineHeight: Typography.fontSize.xxxl * Typography.lineHeight.tight,
    fontWeight: Typography.fontWeight.bold,
  },
  h3: {
    fontSize: Typography.fontSize.xl,
    lineHeight: Typography.fontSize.xl * Typography.lineHeight.normal,
    fontWeight: Typography.fontWeight.semibold,
  },
  subtitle: {
    fontSize: Typography.fontSize.lg,
    lineHeight: Typography.fontSize.lg * Typography.lineHeight.normal,
    fontWeight: Typography.fontWeight.medium,
  },
  body: {
    fontSize: Typography.fontSize.base,
    lineHeight: Typography.fontSize.base * Typography.lineHeight.relaxed,
    fontWeight: Typography.fontWeight.regular,
  },
  caption: {
    fontSize: Typography.fontSize.sm,
    lineHeight: Typography.fontSize.sm * Typography.lineHeight.normal,
    fontWeight: Typography.fontWeight.regular,
  },
  small: {
    fontSize: Typography.fontSize.xs,
    lineHeight: Typography.fontSize.xs * Typography.lineHeight.normal,
    fontWeight: Typography.fontWeight.regular,
  },
};

export default function Text({
  children,
  variant = 'body',
  color = 'textPrimary',
  weight,
  align = 'auto',
  style,
  numberOfLines,
}: TextProps) {
  const variantStyle = variantStyles[variant];
  const finalFontWeight = weight ? Typography.fontWeight[weight] : variantStyle.fontWeight;
  const textColor = typeof color === 'string' ? color : Colors[color];
  
  // Map fontWeight to the correct font family variant
  const getFontFamily = () => {
    const weightMap: { [key in typeof finalFontWeight]: keyof typeof Typography.fontFamily } = {
      '400': 'regular',
      '500': 'medium',
      '600': 'semibold',
      '700': 'bold',
    };
    return Typography.fontFamily[weightMap[finalFontWeight]];
  };

  return (
    <RNText
      style={[
        {
          fontSize: variantStyle.fontSize,
          lineHeight: variantStyle.lineHeight,
          fontFamily: getFontFamily(),
          fontWeight: finalFontWeight,
          color: textColor,
          textAlign: align,
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
