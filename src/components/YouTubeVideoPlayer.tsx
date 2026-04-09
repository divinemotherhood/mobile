import React, { useState, useCallback, memo } from 'react';
import { StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

interface YouTubeVideoPlayerProps {
  videoId: string;
  height?: number;
  play?: boolean; // Controlled playback from parent
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * YouTubeVideoPlayer
 * Memoized to prevent re-renders unless play/videoId changes
 */
export const YouTubeVideoPlayer: React.FC<YouTubeVideoPlayerProps> = memo(({ 
  videoId, 
  height = 220,
  play = false
}) => {
  const [loading, setLoading] = useState(true);

  const onReady = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      <YoutubePlayer
        height={height}
        play={play}
        videoId={videoId}
        onReady={onReady}
        width={SCREEN_WIDTH - 32}
        webViewProps={{
            androidLayerType: 'hardware',
        }}
      />
      {loading && (
        <View style={[styles.loadingOverlay, { height }]}>
          <ActivityIndicator size="large" color="#B388FF" />
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
