import {Alert, Linking, Platform} from 'react-native';

import useGetVersion from './queries/useGetVersion';
import {alerts, numbers} from '@/constants';

const STORE_URL = {
  IOS: 'https://apps.apple.com/kr/app/id6449976767',
  ANDROID: 'https://play.google.com/store/apps/details?id=com.ingg.mylog',
};

function useVersionCheck() {
  const {data: version} = useGetVersion();

  const showUpdateAlert = (platform: 'IOS' | 'ANDROID') => {
    Alert.alert(
      alerts.NOT_LATEST_VERSION.TITLE,
      alerts.NOT_LATEST_VERSION.DESCRIPTION,
      [
        {
          text: '업데이트',
          style: 'default',
          onPress: () => Linking.openURL(STORE_URL[platform]),
        },
        {
          text: '닫기',
          style: 'cancel',
        },
      ],
    );
  };

  const checkVersion = () => {
    if (Platform.OS === 'ios') {
      version?.ios === numbers.CURRENT_VERSION.IOS
        ? Alert.alert(alerts.ALREADY_LATEST_VERSION.TITLE, '')
        : showUpdateAlert('IOS');
    }
    if (Platform.OS === 'android') {
      version?.android === numbers.CURRENT_VERSION.ANDROID
        ? Alert.alert(alerts.ALREADY_LATEST_VERSION.TITLE, '')
        : showUpdateAlert('ANDROID');
    }
  };

  return {checkVersion};
}

export default useVersionCheck;
