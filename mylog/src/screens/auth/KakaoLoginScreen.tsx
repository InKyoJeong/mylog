import axios from 'axios';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {
  WebView,
  WebViewMessageEvent,
  WebViewNavigation,
} from 'react-native-webview';
import Config from 'react-native-config';

import useAuth from '@/hooks/queries/useAuth';
import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants';
import type {ThemeMode} from '@/types';

const REDIRECT_URI = `${Config.BASE_URL}/auth/oauth/kakao`;
const INJECTED_JAVASCRIPT = "window.ReactNativeWebView.postMessage('')";

function KakaoLoginScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {kakaoLoginMutation} = useAuth();
  const [isChangeNavigate, setIsChangeNavigate] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
    const isMatched = event.url.includes(`${REDIRECT_URI}?code=`);
    setIsLoading(isMatched);
    setIsChangeNavigate(event.loading);
  };

  return (
    <SafeAreaView style={styles.container}>
      {(isChangeNavigate || isLoading) && (
        <View style={styles.kakaoLoadingContiner}>
          <ActivityIndicator size={'small'} color={colors[theme].BLACK} />
        </View>
      )}
      <WebView
        style={styles.container}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        onMessage={handleOnMessage}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onNavigationStateChange={handleNavigationStateChange}
      />
    </SafeAreaView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    kakaoLoadingContiner: {
      backgroundColor: colors[theme].WHITE,
      height: Dimensions.get('window').height,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default KakaoLoginScreen;
