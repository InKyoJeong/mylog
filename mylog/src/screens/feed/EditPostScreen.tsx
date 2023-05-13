import React, {useRef, useState} from 'react';
import {ScrollView, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native';
import {StyleSheet, View} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

import CustomKeyboardAvoidingView from '@/components/@keyboard/CustomKeyboardAvoidingView';
import InputField from '@/components/@common/InputField';
import CustomButton from '@/components/@common/CustomButton';
import PreviewImageList from '@/components/post/PreviewImageList';
import MarkerSelector from '@/components/post/MarkerSelector';
import ScoreInput from '@/components/post/ScoreInput';
import ImageInput from '@/components/post/ImageInput';
import DatePickerModal from '@/components/post/DatePickerModal';
import useDetailPostStore from '@/store/useDetailPostStore';
import usePermission from '@/hooks/common/usePermission';
import useDatePicker from '@/hooks/common/useDatePicker';
import useForm from '@/hooks/common/useForm';
import {getDateWithSeparator} from '@/utils/date';
import {validateAddPost} from '@/utils/validate';
import {colors} from '@/constants/colors';
import {MarkerColor} from '@/types/domain';

interface EditPostScreenProps {}

function EditPostScreen({}: EditPostScreenProps) {
  const {detailPost} = useDetailPostStore();
  const descriptionRef = useRef<TextInput | null>(null);
  const [marker, setMarker] = useState<MarkerColor>(detailPost?.color ?? 'RED');
  const [score, setScore] = useState(detailPost?.score ?? 3);
  const datePicker = useDatePicker(new Date(String(detailPost?.date)));
  const addPost = useForm({
    initialValue: {
      title: detailPost?.title ?? '',
      description: detailPost?.description ?? '',
    },
    validate: validateAddPost,
  });
  usePermission('PHOTO');

  const handleSelectMarker = (name: MarkerColor) => {
    setMarker(name);
  };

  const handleChangeScore = (value: number) => {
    setScore(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomKeyboardAvoidingView>
        <ScrollView
          style={styles.contentContainer}
          scrollIndicatorInsets={{right: 1}}>
          <View style={styles.inputContainer}>
            <InputField
              value={detailPost?.address}
              disabled={true}
              icon={
                <Octicons name="location" size={16} color={colors.GRAY_500} />
              }
            />
            <CustomButton
              variant="outlined"
              size="large"
              label={`${getDateWithSeparator(datePicker.date, '. ')}`}
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
              <ImageInput />
              <PreviewImageList />
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

export default EditPostScreen;
