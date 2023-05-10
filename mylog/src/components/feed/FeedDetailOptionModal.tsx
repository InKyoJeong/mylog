import React from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {CompoundModal} from '../@common/CompoundModal';
import {useDeletePost} from '@/hooks/queries/usePost';
import useDetailPostStore from '@/store/useDetailPostStore';
import {alerts} from '@/constants/messages';

interface FeedDetailOptionModalProps {
  isVisible: boolean;
  hideOption: () => void;
}

function FeedDetailOptionModal({
  isVisible,
  hideOption,
}: FeedDetailOptionModalProps) {
  const navigation = useNavigation();
  const {detailPost} = useDetailPostStore();
  const deletePostMutation = useDeletePost();

  const handleDeletePost = () => {
    if (!detailPost) {
      return;
    }

    Alert.alert(alerts.DELETE_POST.TITLE, alerts.DELETE_POST.DESCRIPTION, [
      {
        text: '삭제',
        onPress: () =>
          deletePostMutation.mutate(detailPost.id, {
            onSuccess: () => {
              hideOption();
              navigation.goBack();
            },
          }),
        style: 'destructive',
      },
      {
        text: '취소',
        style: 'cancel',
      },
    ]);
  };

  const handleEditPost = () => {
    //
  };

  return (
    <CompoundModal isVisible={isVisible} hideModal={hideOption}>
      <CompoundModal.OptionBackground>
        <CompoundModal.OptionButtonList>
          <CompoundModal.OptionButton onPress={handleDeletePost} isDanger>
            삭제하기
          </CompoundModal.OptionButton>
          <CompoundModal.OptionDivider />
          <CompoundModal.OptionButton onPress={handleEditPost}>
            수정하기
          </CompoundModal.OptionButton>
        </CompoundModal.OptionButtonList>

        <CompoundModal.OptionButtonList>
          <CompoundModal.OptionButton onPress={hideOption}>
            취소
          </CompoundModal.OptionButton>
        </CompoundModal.OptionButtonList>
      </CompoundModal.OptionBackground>
    </CompoundModal>
  );
}

export default FeedDetailOptionModal;
