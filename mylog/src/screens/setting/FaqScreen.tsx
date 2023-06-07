import React, {useRef, useState} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import Config from 'react-native-config';
import WebView from 'react-native-webview';

import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import {colors} from '@/constants';

function FaqScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const webviewRef = useRef<WebView | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleWebViewLoad = () => {
    setIsLoading(false);

    if (webviewRef.current) {
      webviewRef.current.postMessage(JSON.stringify({theme}));
    }
  };

  const renderLoading = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors[theme].BLACK} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && renderLoading()}
      <WebView
        ref={webviewRef}
        source={{uri: `${Config.WEB_URL}/faq`}}
        onLoad={handleWebViewLoad}
      />
    </SafeAreaView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    loadingContainer: {
      height: '100%',
      backgroundColor: colors[theme].WHITE,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default FaqScreen;
