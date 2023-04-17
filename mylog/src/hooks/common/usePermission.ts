import {useEffect} from 'react';
import {Alert, AlertButton, Linking, Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const alertSettingButtons: AlertButton[] = [
  {
    text: '설정하기',
    onPress: () => Linking.openSettings(),
  },
  {
    text: '취소',
    onPress: () => console.log('취소'),
    style: 'cancel',
  },
];

function usePermissions() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        .then((result: string) => {
          if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
            Alert.alert(
              '이 앱은 위치 권한 허용이 필요합니다.',
              '앱 설정 화면을 열어서 [항상 허용]으로 바꿔주세요.',
              alertSettingButtons,
            );
          }
        })
        .catch(console.error);
    } else if (Platform.OS === 'ios') {
      check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        .then((result: string) => {
          if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
            Alert.alert(
              '이 앱은 위치 권한 허용이 필요합니다.',
              '설정 화면에서 [앱을 사용하는 동안] 또는 [항상 허용]으로 바꿔주세요.',
              alertSettingButtons,
            );
          }
        })
        .catch(console.error);
    }
    if (Platform.OS === 'android') {
      check(PERMISSIONS.ANDROID.CAMERA)
        .then((result: string) => {
          if (result === RESULTS.DENIED || result === RESULTS.GRANTED) {
            return request(PERMISSIONS.ANDROID.CAMERA);
          } else {
            console.log(result);
            // throw new Error('카메라 권한을 허용해주세요.');

            Alert.alert(
              '카메라 권한이 필요합니다.',
              '설정 화면에서 카메라 권한을 허용해주세요.',
              alertSettingButtons,
            );
          }
        })
        .catch(console.error);
    } else {
      check(PERMISSIONS.IOS.CAMERA)
        .then((result: string) => {
          if (
            result === RESULTS.DENIED ||
            result === RESULTS.LIMITED ||
            result === RESULTS.GRANTED
          ) {
            return request(PERMISSIONS.IOS.CAMERA);
          } else {
            console.log(result);
            // throw new Error('카메라 권한을 허용해주세요.');

            Alert.alert(
              '카메라 권한이 필요합니다.',
              '설정 화면에서 카메라 권한을 허용해주세요.',
              alertSettingButtons,
            );
          }
        })
        .catch(console.error);
    }
  }, []);
}

export default usePermissions;
