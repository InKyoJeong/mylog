import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import StickyHeader from './common/StickyHeader';
import {colors} from '@/constants/colors';

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
  return (
    <StickyHeader isScrolled={isScrolled}>
      <Octicons
        name="arrow-left"
        size={30}
        color={colors.BLACK}
        onPress={onPressLeft}
      />
      <Ionicons
        name="ellipsis-vertical"
        size={25}
        color={colors.BLACK}
        onPress={onPressRight}
      />
    </StickyHeader>
  );
}

export default FeedDetailHeader;
