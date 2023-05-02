import {useEffect} from 'react';
import {Alert, AlertButton, Linking, Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  request,
  RESULTS,
  Permission,
} from 'react-native-permissions';

type PermissionType = 'LOCATION' | 'PHOTO';

type PermissionOS = {
  [key in PermissionType]: Permission;
};

const androidPermissions: PermissionOS = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

const iosPermissions: PermissionOS = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

const alertSettingButtons: AlertButton[] = [
  {
    text: '설정하기',
    onPress: () => Linking.openSettings(),
  },
  {
    text: '취소',
    style: 'cancel',
  },
];

const alerts = {
  LOCATION_PERMISSION: {
    TITLE: '위치 권한 허용이 필요합니다.',
    DESCRIPTION:
      '설정 화면에서 [앱을 사용하는 동안] 또는 [항상 허용]으로 바꿔주세요.',
  },
  PHOTO_PERMISSION: {
    TITLE: '사진 접근 권한이 필요합니다.',
    DESCRIPTION: '설정 화면에서 사진 접근 권한을 허용해주세요.',
  },
};

function usePermissions(type: PermissionType) {
  useEffect(() => {
    (async () => {
      const permissionOS =
        Platform.OS === 'ios' ? iosPermissions : androidPermissions;
      const checked = await check(permissionOS[type]);

      switch (checked) {
        case RESULTS.DENIED:
          request(permissionOS[type]);
          break;
        case RESULTS.LIMITED:
        case RESULTS.BLOCKED:
          Alert.alert(
            alerts[`${type}_PERMISSION`].TITLE,
            alerts[`${type}_PERMISSION`].DESCRIPTION,
            alertSettingButtons,
          );
          break;
        default:
          break;
      }
    })();
  }, [type]);
}

export default usePermissions;
