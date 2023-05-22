import {useEffect} from 'react';
import {Alert, AlertButton, Linking, Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  request,
  RESULTS,
  Permission,
} from 'react-native-permissions';

import {alerts} from '@/constants';

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

const alertOption: AlertButton[] = [
  {
    text: '설정하기',
    onPress: () => Linking.openSettings(),
  },
  {
    text: '취소',
    style: 'cancel',
  },
];

function usePermission(type: PermissionType) {
  useEffect(() => {
    (async () => {
      const isAndroid = Platform.OS === 'android';
      const permissionOS = isAndroid ? androidPermissions : iosPermissions;
      const checked = await check(permissionOS[type]);

      const openPermissionAlert = () => {
        Alert.alert(
          alerts[`${type}_PERMISSION`].TITLE,
          alerts[`${type}_PERMISSION`].DESCRIPTION,
          alertOption,
        );
      };

      switch (checked) {
        case RESULTS.DENIED:
          if (isAndroid) {
            openPermissionAlert();
            return;
          }
          await request(permissionOS[type]);
          break;
        case RESULTS.LIMITED:
        case RESULTS.BLOCKED:
          openPermissionAlert();
          break;
        default:
          break;
      }
    })();
  }, [type]);
}

export default usePermission;
