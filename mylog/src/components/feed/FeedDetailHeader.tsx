import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import StickyHeader from '../@common/StickyHeader';
import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants';

interface FeedDetailHeaderProps {
  isScrolled: boolean;
  onPressLeft: () => void;
  onPressRight: () => void;
}

function FeedDetailHeader({
  isScrolled,
  onPressLeft,
  onPressRight,
}: FeedDetailHeaderProps) {
  const {theme} = useThemeStore();

  return (
    <StickyHeader isScrolled={isScrolled}>
      <Octicons
        name="arrow-left"
        size={30}
        color={isScrolled ? colors[theme].BLACK : colors[theme].WHITE}
        onPress={onPressLeft}
      />
      <Ionicons
        name="ellipsis-vertical"
        size={25}
        color={isScrolled ? colors[theme].BLACK : colors[theme].WHITE}
        onPress={onPressRight}
      />
    </StickyHeader>
  );
}

export default FeedDetailHeader;
