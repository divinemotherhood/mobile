/**
 * Button Component
 * Reusable button supporting different variants, sizes, and states
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Colors, ColorType } from '../../../config/colors';
import { Spacing, BorderRadius } from '../../../config/spacing';
import { Typography } from '../../../config/typography';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'google';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
}

export default function Button({
  onPress,
  title,
  variant = 'primary',
  size = 'lg',
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
  fullWidth = true,
}: ButtonProps) {
  const sizeConfig = {
    sm: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      fontSize: Typography.fontSize.sm,
    },
    md: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      fontSize: Typography.fontSize.base,
    },
    lg: {
      paddingVertical: 14,
      paddingHorizontal: 24,
      fontSize: Typography.fontSize.lg,
    },
  };

  const variantStyles: Record<ButtonVariant, { backgroundColor: string; borderWidth: number; borderColor?: string; text: string }> = {
    primary: {
      backgroundColor: Colors.primary,
      borderWidth: 0,
      text: Colors.white,
    },
    secondary: {
      backgroundColor: Colors.primaryLight,
      borderWidth: 0,
      text: Colors.primary,
    },
    outline: {
      backgroundColor: Colors.white,
      borderWidth: 1,
      borderColor: Colors.border,
      text: Colors.textPrimary,
    },
    google: {
      backgroundColor: Colors.white,
      borderWidth: 1,
      borderColor: Colors.border,
      text: Colors.textPrimary,
    },
  };

  const config = sizeConfig[size];
  const variantStyle = variantStyles[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          paddingVertical: config.paddingVertical,
          paddingHorizontal: config.paddingHorizontal,
          backgroundColor: disabled ? Colors.textLight : variantStyle.backgroundColor,
          borderWidth: variantStyle.borderWidth,
          borderColor: variantStyle.borderColor || Colors.border,
          width: fullWidth ? '100%' : 'auto',
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variantStyle.text} />
      ) : (
        <>
          {icon && icon}
          <Text
            style={[
              styles.text,
              {
                fontSize: config.fontSize,
                color: disabled ? Colors.textLight : variantStyle.text,
                marginLeft: icon ? Spacing.sm : 0,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
});
