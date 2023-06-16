import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HeaderButton from '../@common/HeaderButton';
import useThemeStore from '@/store/useThemeStore';
import useViewModeStore, {Mode} from '@/store/useViewModeStore';
import {colors} from '@/constants';
import type {ThemeMode} from '@/types';

function getViewModeIcon(mode: Mode, theme: ThemeMode) {
  switch (mode) {
    case 'feed': {
      return (
        <MaterialIcons
          name="view-agenda"
          size={18}
          color={colors[theme].BLACK}
        />
      );
    }
    case 'album': {
      return <Ionicons name="grid" size={18} color={colors[theme].BLACK} />;
    }
    default: {
      return <Ionicons name="grid" size={18} color={colors[theme].BLACK} />;
    }
  }
}

function FeedHomeHeaderRight() {
  const {theme} = useThemeStore();
  const {showOption, mode} = useViewModeStore();

  return (
    <HeaderButton icon={getViewModeIcon(mode, theme)} onPress={showOption} />
  );
}

export default FeedHomeHeaderRight;
