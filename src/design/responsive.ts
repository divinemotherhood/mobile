import { Dimensions, PixelRatio } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');

// Base guideline (iPhone 11 / 375 width)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

// Custom scaling (optional override if needed)
export const scaleWidth = (size: number) =>
    (width / guidelineBaseWidth) * size;

export const scaleHeight = (size: number) =>
    (height / guidelineBaseHeight) * size;

// Library-based scaling (preferred)
export const s = scale;
export const vs = verticalScale;
export const ms = moderateScale;

// Font scaling (controlled)
export const fontScale = (size: number) => {
    const scaled = moderateScale(size);
    return Math.round(PixelRatio.roundToNearestPixel(scaled));
};

// Screen helpers
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

// Device type helpers
export const isSmallDevice = width < 360;
export const isTablet = width >= 768;