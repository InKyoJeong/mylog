import React from 'react';
import type {StackScreenProps} from '@react-navigation/stack';

import type {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import PostEditor from '@/components/post/PostEditor';
import {mapNavigations} from '@/constants/navigations';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

function AddPostScreen({route}: AddPostScreenProps) {
  const {location} = route.params;

  return <PostEditor location={location} />;
}

export default AddPostScreen;
