import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {CompoundOption} from '../@common/CompoundOption';
import useThemeStore from '@/store/useThemeStore';
import useViewModeStore from '@/store/useViewModeStore';
import {colors} from '@/constants';

function FeedViewModeOption() {
  const {theme} = useThemeStore();
  const {isVisible, hideOption, mode, setMode} = useViewModeStore();

  const handlePressAlbumMode = () => {
    setMode('album');
    hideOption();
  };

  const handlePressFeedMode = () => {
    setMode('feed');
    hideOption();
  };

  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.Background>
        <CompoundOption.Container>
          <CompoundOption.Radio
            isChecked={mode === 'album'}
            onPress={handlePressAlbumMode}
            icon={
              <Ionicons name="grid" size={18} color={colors[theme].BLACK} />
            }>
            앨범형
          </CompoundOption.Radio>
          <CompoundOption.Radio
            isChecked={mode === 'feed'}
            onPress={handlePressFeedMode}
            icon={
              <MaterialIcons
                name="view-agenda"
                size={18}
                color={colors[theme].BLACK}
              />
            }>
            피드형
          </CompoundOption.Radio>
        </CompoundOption.Container>
      </CompoundOption.Background>
    </CompoundOption>
  );
}

export default FeedViewModeOption;
