import {Alert, Linking, Platform} from 'react-native';

import useGetVersion from './queries/useGetVersion';
import {numbers} from '@/constants';

const STORE_URL = {
  IOS: 'https://apps.apple.com/kr/app/id6449976767',
  ANDROID: 'https://play.google.com/store/apps/details?id=com.ingg.mylog',
};

function useVersionCheck() {
  const {data: version} = useGetVersion();

  const showUpdateAlert = (platform: 'IOS' | 'ANDROID') => {
    return Alert.alert(
      '최신 버전이 존재합니다.',
      '새로운 기능을 위해 업데이트 해주세요.',
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
        ? Alert.alert('앱이 최신버전입니다.', '')
        : showUpdateAlert('IOS');
    }
    if (Platform.OS === 'android') {
      version?.ios === numbers.CURRENT_VERSION.ANDROID
        ? Alert.alert('앱이 최신버전입니다.', '')
        : showUpdateAlert('ANDROID');
    }
  };

  return {checkVersion};
}

export default useVersionCheck;
