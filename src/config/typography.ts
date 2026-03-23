/**
 * Typography constants for consistent text styling
 */

export const Typography = {
  fontFamily: {
    regular: 'InstrumentSans-Regular',
    medium: 'InstrumentSans-Medium',
    semibold: 'InstrumentSans-SemiBold',
    bold: 'InstrumentSans-Bold',
  },

  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 40,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },

  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};
