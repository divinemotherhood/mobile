import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_W } = Dimensions.get('window');
const BASE_WIDTH = 375;

export const rf = (size: number, min: number, max: number): number => {
  const scaled = size * (SCREEN_W / BASE_WIDTH);
  return Math.min(max, Math.max(min, PixelRatio.roundToNearestPixel(scaled)));
};