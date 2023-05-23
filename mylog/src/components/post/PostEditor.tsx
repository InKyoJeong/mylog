import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {LatLng} from 'react-native-maps';
import Octicons from 'react-native-vector-icons/Octicons';

import type {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import CustomButton from '../@common/CustomButton';
import InputField from '../@common/InputField';
import CustomKeyboardAvoidingView from '../@common/CustomKeyboardAvoidingView';
import MarkerSelector from './MarkerSelector';
import ScoreInput from './ScoreInput';
import ImageInput from './ImageInput';
import PreviewImageList from './PreviewImageList';
import DatePickerModal from './DatePickerModal';
import AddPostHeaderRight from './AddPostHeaderRight';
import EditPostHeaderRight from './EditPostHeaderRight';
import useForm from '@/hooks/useForm';
import useDatePicker from '@/hooks/useDatePicker';
import useGetAddress from '@/hooks/useGetAddress';
import useImagePicker from '@/hooks/useImagePicker';
import usePermission from '@/hooks/usePermission';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import useMutateUpdatePost from '@/hooks/queries/useMutateUpdatePost';
import useDetailPostStore from '@/store/useDetailPostStore';
import useThemeStore from '@/store/useThemeStore';
import {validateAddPost, getDateWithSeparator} from '@/utils';
import {colors, numbers} from '@/constants';
import type {UseMutationCustomOptions, MarkerColor} from '@/types';

interface PostEditorProps {
  isEdit?: boolean;
  location: LatLng;
}

function PostEditor({isEdit = false, location}: PostEditorProps) {
  const {theme} = useThemeStore();
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
  const [markerColor, setMarkerColor] = useState<MarkerColor>(
    isEditMode ? detailPost.color : 'RED',
  );
  const [score, setScore] = useState(
    isEditMode ? detailPost.score : numbers.DEFAULT_SCORE,
  );
  const imagePicker = useImagePicker({
    initialImages: isEditMode ? detailPost.images : [],
    mode: 'multiple',
  });
  const createPost = useMutateCreatePost();
  const updatePost = useMutateUpdatePost();
  usePermission('PHOTO');

  const handleSelectMarker = (name: MarkerColor) => {
    setMarkerColor(name);
  };

  const handleChangeScore = (value: number) => {
    setScore(value);
  };

  const handleSubmit = useCallback(() => {
    const body = {
      date: datePicker.date,
      title: addPost.values.title,
      description: addPost.values.description,
      color: markerColor,
      score,
      imageUris: imagePicker.imageUris,
    };
    const mutationOptions: UseMutationCustomOptions = {
      onSuccess: () => navigation.goBack(),
    };

    if (isEditMode) {
      updatePost.mutate({id: detailPost.id, body}, mutationOptions);
      return;
    }

    createPost.mutate({address, ...location, ...body}, mutationOptions);
  }, [
    navigation,
    isEditMode,
    address,
    location,
    addPost.values,
    detailPost?.id,
    datePicker.date,
    markerColor,
    score,
    imagePicker.imageUris,
    updatePost,
    createPost,
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
                <Octicons
                  name="location"
                  size={16}
                  color={colors[theme].GRAY_500}
                />
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
              maxLength={numbers.MAX_POST_TITLE_LENGTH}
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
              maxLength={numbers.MAX_POST_DESCRIPTION_LENGTH}
              returnKeyType="next"
              multiline
            />
            <MarkerSelector
              markerColor={markerColor}
              onPressMarker={handleSelectMarker}
            />
            <ScoreInput score={score} onChangeScore={handleChangeScore} />
            <View style={styles.imagesViewer}>
              <ImageInput onChange={imagePicker.handleChange} />
              <PreviewImageList
                imageUris={imagePicker.imageUris}
                onDelete={imagePicker.delete}
                onChangeOrder={imagePicker.changeOrder}
                showDeleteButton={true}
                showOrderButton={!isEdit}
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
