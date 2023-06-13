import React, {useEffect} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import type {DownloadProgress} from 'react-native-code-push';

import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants';
import type {ThemeMode} from '@/types';

interface SyncProgressViewProps {
  syncProgress: DownloadProgress;
}

const progressWidth = Dimensions.get('window').width - 30;

function SyncProgressView({syncProgress}: SyncProgressViewProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  useEffect(() => {
    if (syncProgress) {
      SplashScreen.hide();
    }
  }, [syncProgress]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.text}>
          안정적인 서비스 사용을 위해 내부 업데이트를 진행합니다.
        </Text>
        <Text style={styles.text}>재시작까지 잠시만 기다려주세요.</Text>

        <View style={{width: progressWidth}}>
          <View
            style={[
              styles.progressBar,
              {
                width:
                  (syncProgress.receivedBytes / syncProgress.totalBytes) *
                  progressWidth,
              },
            ]}
          />
        </View>

        <Text style={styles.percentText}>
          {Math.floor(
            (syncProgress.receivedBytes / syncProgress.totalBytes) * 100,
          ) + ' %'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
      alignItems: 'center',
      justifyContent: 'center',
    },
    column: {
      padding: 10,
      alignItems: 'center',
      gap: 5,
    },
    text: {
      color: colors[theme].BLACK,
      fontSize: 14,
      textAlign: 'center',
    },
    percentText: {
      color: colors[theme].BLACK,
      fontWeight: 'bold',
      fontSize: 15,
    },
    progressBar: {
      height: 20,
      backgroundColor: colors[theme].PINK_700,
      borderRadius: 10,
      marginTop: 10,
    },
  });

export default SyncProgressView;
