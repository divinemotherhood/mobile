import React, { useRef, useCallback, useState, useEffect } from 'react';
import { View } from 'react-native';
import { YouTubeShortsPlayer } from './YouTubeShortsPlayer';

interface Props {
  videoId: string;
  width?: number;
  height?: number;
  scrollY: number;
  windowHeight: number;
  isFocused: boolean;
  scrollViewOffset: number; // ← NEW: pass scrollView's Y position on screen
}

const VISIBILITY_THRESHOLD = 80;

export const VisibilityAwareShort: React.FC<Props> = ({
  videoId,
  width = 200,
  height = 350,
  scrollY,
  windowHeight,
  isFocused,
  scrollViewOffset,
}) => {
  const sectionRef = useRef<View>(null);
  // Store position relative to scroll content
  const [layoutY, setLayoutY] = useState<number | null>(null);
  const [layoutH, setLayoutH] = useState<number>(0);

  const handleLayout = useCallback(() => {
    // Small timeout ensures layout is fully committed before measuring
    setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.measure((_x, _y, _w, h, _pageX, pageY) => {
          // pageY = absolute position on screen
          // Convert to position inside scroll content:
          // contentY = pageY - scrollViewOffset + scrollY
          const contentY = pageY - scrollViewOffset + scrollY;
          setLayoutY(contentY);
          setLayoutH(h);
        });
      }
    }, 100);
  }, [scrollViewOffset, scrollY]);

  const isVisible =
    isFocused &&
    layoutY !== null &&
    layoutH > 0 &&
    scrollY + windowHeight - VISIBILITY_THRESHOLD > layoutY &&
    scrollY + VISIBILITY_THRESHOLD < layoutY + layoutH;

  return (
    <View ref={sectionRef} onLayout={handleLayout}>
      <YouTubeShortsPlayer
        videoId={videoId}
        width={width}
        height={height}
        play={isVisible}
      />
    </View>
  );
};