import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  WebView,
  WebViewMessageEvent,
  WebViewNavigation,
} from 'react-native-webview';
import Config from 'react-native-config';
import axios from 'axios';

import useAuth from '@/hooks/queries/useAuth';

const REDIRECT_URI = `${Config.BASE_URL}/auth/oauth/kakao`;
const INJECTED_JAVASCRIPT = "window.ReactNativeWebView.postMessage('')";

function KakaoLoginScreen() {
  const [loading, setLoading] = useState(true);
  const {kakaoLoginMutation} = useAuth();

  const handleOnMessage = (event: WebViewMessageEvent) => {
    if (event.nativeEvent.url.includes(`${REDIRECT_URI}?code=`)) {
      const code = event.nativeEvent.url.replace(`${REDIRECT_URI}?code=`, '');

      requestToken(code);
    }
  };

  const requestToken = async (code: string) => {
    const response = await axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      params: {
        grant_type: 'authorization_code',
        client_id: Config.KAKAO_REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      },
    });

    kakaoLoginMutation.mutate(response.data.access_token);
  };

  const handleNavigationStateChange = (event: WebViewNavigation) => {
    setLoading(event.loading);
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={[
          styles.container,
          loading ? styles.navigationLoading : styles.navigation,
        ]}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        onMessage={handleOnMessage}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onNavigationStateChange={handleNavigationStateChange}
        javaScriptEnabled
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigationLoading: {
    opacity: 1,
  },
  navigation: {
    opacity: 0,
  },
});

export default KakaoLoginScreen;
