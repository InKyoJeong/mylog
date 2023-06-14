import React from 'react';
import type {StackScreenProps} from '@react-navigation/stack';

import type {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import PostEditor from '@/components/post/PostEditor';
import {feedNavigations} from '@/constants';

type EditPostScreenProps = StackScreenProps<
  FeedStackParamList,
  typeof feedNavigations.EDIT_POST
>;

function EditPostScreen({route}: EditPostScreenProps) {
  const {location} = route.params;

  return <PostEditor isEdit location={location} />;
}

export default EditPostScreen;
