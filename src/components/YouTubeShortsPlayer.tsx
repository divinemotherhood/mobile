  import React, { useState, useCallback, memo } from 'react';
  import { StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native';
  import YoutubePlayer from 'react-native-youtube-iframe';

  interface YouTubeShortsPlayerProps {
    videoId: string;
    width?: number;
    height?: number;
    play?: boolean; // Controlled playback from parent
  }

  const { width: SCREEN_WIDTH } = Dimensions.get('window');

  const DEFAULT_W = SCREEN_WIDTH * 0.6;
  const DEFAULT_H = DEFAULT_W * (16 / 9);

  /**
   * YouTubeShortsPlayer
   * Memoized to avoid re-renders during high-frequency scroll events
   */
  export const YouTubeShortsPlayer: React.FC<YouTubeShortsPlayerProps> = memo(({
    videoId,
    width = DEFAULT_W,
    height = DEFAULT_H,
    play = false,
  }) => {
    const [loading, setLoading] = useState(true);

    const playerH = height;
    const playerW = height * (16 / 9);
    const offsetX = (width - playerW) / 2;

    const onReady = useCallback(() => setLoading(false), []);

    return (
      <View style={[styles.container, { width, height }]}>
        <View style={{
          position: 'absolute',
          left: offsetX,
          top: 0,
          width: playerW,
          height: playerH,
        }}>
          <YoutubePlayer
            height={playerH}
            width={playerW}
            play={play}
            videoId={videoId}
            onReady={onReady}
            webViewProps={{
              androidLayerType: 'hardware',
              scrollEnabled: false,
              style: { backgroundColor: '#000' },
            }}
          />
        </View>

        {loading && (
          <View style={StyleSheet.absoluteFill}>
            <View style={styles.loadingWrapper}>
              <ActivityIndicator size="small" color="#B388FF" />
            </View>
          </View>
        )}
      </View>
    );
  });

  const styles = StyleSheet.create({
    container: {
      marginVertical: 10,
      alignSelf: 'center',
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: '#000',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
    },
    loadingWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.1)',
    },
  });