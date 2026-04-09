  import React, { useState, useRef } from 'react';
  import { 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity, 
    ScrollView, 
    ActivityIndicator,
    Modal,
    useWindowDimensions,
    NativeSyntheticEvent,
    NativeScrollEvent,
  } from 'react-native';
  import { SafeAreaProvider } from 'react-native-safe-area-context';
  import { useLocation } from '../../hooks/useLocation';
  import { CommonWebView } from '../../components/CommonWebView';
  import { YouTubeVideoPlayer } from '../../components/YouTubeVideoPlayer';
  import { YouTubeShortsPlayer } from '../../components/YouTubeShortsPlayer';
  import { useSafeAreaInsets } from 'react-native-safe-area-context';
  import { rf } from '../../utils/responsiveFont';
  import { FlexboxDemoSection } from '../Features/FlexboxDemoSection';
 
 
  export default function FeaturesDemoScreen({ navigation }: any) {
    const insets = useSafeAreaInsets();
    const { width, height: windowHeight } = useWindowDimensions();
    const isTablet = width >= 768;
    const { latitude, longitude, error, loading, getLocation } = useLocation();
    const [webViewVisible, setWebViewVisible] = useState(false);
    const [demoUrl, setDemoUrl] = useState('https://reactnative.dev');
    const [isNormalVideoVisible, setIsNormalVideoVisible] = useState(false);
    const [isShortsVisible, setIsShortsVisible] = useState(false);
    const videoY = useRef(0);
    const shortsY = useRef(0);
    const openWebView = (url: string) => {
      setDemoUrl(url);
      setWebViewVisible(true);
    };

      const shortsWidth  = width * 0.55;
const shortsHeight = shortsWidth * (16 / 9);
    
  
const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  const scrollY = event.nativeEvent.contentOffset.y;
  const viewportHeight = windowHeight;
  const viewBottom = scrollY + viewportHeight;

  // Simple logic: Is the Y position of the section between the top and bottom of screen?
  const isVideoInView = videoY.current > 0 && videoY.current < viewBottom && videoY.current > scrollY - 300;
  const isShortsInView = shortsY.current > 0 && shortsY.current < viewBottom && shortsY.current > scrollY - 400;

  // This will definitely show in 'npx react-native log-android'
  if (isShortsInView !== isShortsVisible) {
    console.log('--- SHORTS VISIBILITY CHANGED:', isShortsInView);
    setIsShortsVisible(isShortsInView);
  }
  if (isVideoInView !== isNormalVideoVisible) {
    setIsNormalVideoVisible(isVideoInView);
  }
};
    return (
      <SafeAreaProvider style={styles.container}>
        <ScrollView contentContainerStyle={[styles.scrollContent, { padding: isTablet ? 24 : 16 }]}

          scrollEventThrottle={16} // High frequency for smooth detection
          onScroll={handleScroll}
          >
          <View style={styles.header}>
            <Text style={styles.title}>Feature Showcase</Text>
            <Text style={styles.subtitle}>Location, WebView & YouTube</Text>
          </View>
{/* Flexbox Section */}
<View style={styles.section}>
  <Text style={styles.sectionTitle}>5. Flexbox Concepts</Text>
  <FlexboxDemoSection />
</View>
          {/* Location Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Location Services</Text>
            <View style={styles.card}>
              {loading ? (
                <ActivityIndicator size="small" color="#B388FF" />
              ) : (
                <>
                  <Text style={styles.cardText}>
                    Latitude: {latitude?.toFixed(6) ?? 'Not fetched'}
                  </Text>
                  <Text style={styles.cardText}>
                    Longitude: {longitude?.toFixed(6) ?? 'Not fetched'}
                  </Text>
                  {error && <Text style={styles.errorText}>{error}</Text>}
                </>
              )}
              <TouchableOpacity 
                style={styles.button} 
                onPress={getLocation}
                disabled={loading}
              >
                <Text style={styles.buttonText}>Get Current Location</Text>
              </TouchableOpacity>
            </View>
          </View>
         

          {/* YouTube Section */}
          <View style={styles.section}
         onLayout={(e) => { 
    // This captures the position relative to the ScrollView
    videoY.current = e.nativeEvent.layout.y; 
    console.log('Shorts Y Position:', shortsY.current);
  }}
          >
            <Text style={styles.sectionTitle}>2. YouTube Video Player</Text>
            <YouTubeVideoPlayer key="static-video-player"
            videoId="dQw4w9WgXcQ"
            play={isNormalVideoVisible} /> 
            <Text style={styles.caption}>Stable cross-platform IFrame integration</Text>
          </View>

          {/* YouTube Shorts Section */}
         {/* YouTube Shorts Section */}
        
<View
 
  style={styles.section}
  onLayout={(e) => { 
    shortsY.current = e.nativeEvent.layout.y; 
  }}
>
  <Text style={styles.sectionTitle}>3. YouTube Shorts</Text>
  
  {/* If it's not visible, we render a black box instead of the player */}
  
  {isShortsVisible ? (
    
    <YouTubeShortsPlayer 
      videoId="r_mI-_Wb-9Y" 
     width={shortsWidth} height={shortsHeight}
      play={true} 
    />
  ) : (
    <View style={[styles.shortsPlaceholder, { width: shortsWidth, height: shortsHeight }]}>
      <ActivityIndicator color="#B388FF" />
    </View>
  )}
  
  <Text style={styles.caption}>Vertical 9:16 aspect ratio optimization</Text>
</View>

          {/* WebView Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. WebView Component</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity 
                style={[styles.button, styles.secondaryButton]} 
                onPress={() => openWebView('https://reactnative.dev')}
              >
                <Text style={styles.buttonText}>Open RN Docs</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.secondaryButton]} 
                onPress={() => openWebView('https://www.google.com')}
              >
                <Text style={styles.buttonText}>Open Google</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* WebView Modal */}
        <Modal
          visible={webViewVisible}
          animationType="slide"
          onRequestClose={() => setWebViewVisible(false)}
        >
          <SafeAreaProvider style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setWebViewVisible(false)}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>WebView Preview</Text>
              <View style={{ width: 40 }} />
            </View>
            <CommonWebView url={demoUrl} />
          </SafeAreaProvider>
        </Modal>
      </SafeAreaProvider>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F9FE',
    },
    
   scrollContent: { paddingBottom: 40 }
,
    header: {
      marginBottom: 24,
      marginTop: 10,
    },
    title: {
      fontSize: rf(28, 22, 34),
      fontWeight: '700',
      color: '#1A1A1A',
      fontFamily: 'Larken-Bold'
    },
    subtitle: {
      fontSize: rf(16, 13, 20),
      color: '#666',
      marginTop: 4,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: rf(18, 15, 22),
      fontWeight: '600',
      color: '#333',
      marginBottom: 12,
    },
    card: {
      backgroundColor: '#FFF',
      borderRadius: 12,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 3,
    },
    cardText: {
      fontSize: rf(16, 13, 19),
      color: '#444',
      marginBottom: 8,
    },
    errorText: {
      color: '#FF5252',
      fontSize: rf(14, 12, 17),
      marginTop: 8,
    },
    button: {
      backgroundColor: '#B388FF',
      borderRadius: 10,
      paddingVertical: 12,
      alignItems: 'center',
      marginTop: 12,
    },
    secondaryButton: {
      backgroundColor: '#673AB7',
      flex: 1,
      marginHorizontal: 4,
    },
    buttonGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    buttonText: {
      color: '#FFF',
      fontSize: rf(16, 13, 19),
      fontWeight: '600',
    },
    caption: {
      fontSize: rf(12, 10, 15),
      color: '#888',
      textAlign: 'center',
      marginTop: 8,
    },
    backButton: {
      marginTop: 20,
      padding: 12,
      alignItems: 'center',
    },
    backButtonText: {
      color: '#666',
      fontSize: rf(16, 13, 19),
    },
    modalContainer: {
      flex: 1,
      backgroundColor: '#FFF',
    },
    modalHeader: {
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#EEE',
    },
    modalTitle: {
      fontSize: rf(16, 13, 19),
      fontWeight: '600',
    },
    shortsPlaceholder: {
  backgroundColor: '#000',
  borderRadius: 16,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  marginVertical: 10,
},
    closeButton: {
      color: '#B388FF',
      fontSize: rf(16, 13, 19),
      fontWeight: '600',
    },
  });
