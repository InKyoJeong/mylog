import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import type {LatLng} from 'react-native-maps';
import Octicons from 'react-native-vector-icons/Octicons';

import type {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import CustomButton from '../@common/CustomButton';
import InputField from '../@common/InputField';
import CustomKeyboardAvoidingView from '../@keyboard/CustomKeyboardAvoidingView';
import MarkerSelector from './MarkerSelector';
import ScoreInput from './ScoreInput';
import ImageInput from './ImageInput';
import PreviewImageList from './PreviewImageList';
import DatePickerModal from './DatePickerModal';
import AddPostHeaderRight from './AddPostHeaderRight';
import EditPostHeaderRight from './EditPostHeaderRight';
import useForm from '@/hooks/common/useForm';
import useDatePicker from '@/hooks/common/useDatePicker';
import useGetAddress from '@/hooks/common/useGetAddress';
import useImageInput from '@/hooks/common/useImageInput';
import usePermission from '@/hooks/common/usePermission';
import {useCreatePost, useUpdatePost} from '@/hooks/queries/usePost';
import useDetailPostStore from '@/store/useDetailPostStore';
import {validateAddPost} from '@/utils/validate';
import {getDateWithSeparator} from '@/utils/date';
import {colors} from '@/constants/colors';
import type {MarkerColor} from '@/types/domain';
import type {UseMutationCustomOptions} from '@/types';

interface PostEditorProps {
  isEdit?: boolean;
  location: LatLng;
}

function PostEditor({isEdit, location}: PostEditorProps) {
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();
  const {detailPost} = useDetailPostStore();
  const isEditMode = isEdit && detailPost;
  const descriptionRef = useRef<TextInput | null>(null);
  const address = useGetAddress(location);
  const addPost = useForm({
    initialValue: {
      title: isEditMode ? detailPost.title : '',
      description: isEditMode ? detailPost.description : '',
    },
    validate: validateAddPost,
  });
  const datePicker = useDatePicker(
    isEditMode ? new Date(String(detailPost.date)) : new Date(),
  );
  const [marker, setMarker] = useState<MarkerColor>(
    isEditMode ? detailPost.color : 'RED',
  );
  const [score, setScore] = useState(isEditMode ? detailPost.score : 3);
  const imageInput = useImageInput(isEditMode ? detailPost.images : []);
  const createPostMutation = useCreatePost();
  const updatePostMutation = useUpdatePost();
  usePermission('PHOTO');

  const handleSelectMarker = (name: MarkerColor) => {
    setMarker(name);
  };

  const handleChangeScore = (value: number) => {
    setScore(value);
  };

  const handleSubmit = useCallback(() => {
    const body = {
      date: datePicker.date,
      title: addPost.values.title,
      description: addPost.values.description,
      color: marker,
      score,
      imageUris: imageInput.imageUris,
    };
    const mutationOptions: UseMutationCustomOptions = {
      onSuccess: () => navigation.goBack(),
    };

    if (isEditMode) {
      updatePostMutation.mutate({id: detailPost.id, body}, mutationOptions);
      return;
    }

    createPostMutation.mutate({address, ...location, ...body}, mutationOptions);
  }, [
    navigation,
    isEditMode,
    address,
    location,
    addPost.values,
    detailPost?.id,
    datePicker.date,
    marker,
    score,
    imageInput.imageUris,
    createPostMutation,
    updatePostMutation,
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        isEditMode
          ? EditPostHeaderRight(handleSubmit, addPost.hasErrors)
          : AddPostHeaderRight(handleSubmit, addPost.hasErrors),
    });
  }, [isEditMode, handleSubmit, navigation, addPost.hasErrors]);

  return (
    <SafeAreaView style={styles.container}>
      <CustomKeyboardAvoidingView>
        <ScrollView
          style={styles.contentContainer}
          scrollIndicatorInsets={{right: 1}}>
          <View style={styles.inputContainer}>
            <InputField
              value={isEditMode ? detailPost.address : address}
              disabled={true}
              icon={
                <Octicons name="location" size={16} color={colors.GRAY_500} />
              }
            />
            <CustomButton
              variant="outlined"
              size="large"
              label={
                datePicker.isPicked || isEdit
                  ? `${getDateWithSeparator(datePicker.date, '. ')}`
                  : '날짜 선택'
              }
              onPress={datePicker.showModal}
            />
            <InputField
              {...addPost.getTextInputProps('title')}
              error={addPost.errors.title}
              touched={addPost.touched.title}
              placeholder="제목을 입력하세요."
              maxLength={30}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                descriptionRef.current?.focus();
              }}
            />
            <InputField
              {...addPost.getTextInputProps('description')}
              error={addPost.errors.description}
              touched={addPost.touched.description}
              ref={descriptionRef}
              placeholder="기록하고 싶은 내용을 입력하세요. (선택)"
              maxLength={3000}
              returnKeyType="next"
              multiline
            />
            <MarkerSelector
              marker={marker}
              onPressMarker={handleSelectMarker}
            />
            <ScoreInput score={score} onChangeScore={handleChangeScore} />
            <View style={styles.imagesViewer}>
              <ImageInput onChange={imageInput.handleChange} />
              <PreviewImageList
                imageUris={imageInput.imageUris}
                onDelete={imageInput.delete}
                onChangeOrder={imageInput.changeOrder}
                showOption
              />
            </View>
            <DatePickerModal
              date={datePicker.date}
              isVisible={datePicker.isVisible}
              onChangeDate={datePicker.handleChange}
              onConfirmDate={datePicker.handleConfirm}
            />
          </View>
        </ScrollView>
      </CustomKeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
  imagesViewer: {
    flexDirection: 'row',
  },
});

export default PostEditor;
