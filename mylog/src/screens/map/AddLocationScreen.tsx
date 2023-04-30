import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import Octicons from 'react-native-vector-icons/Octicons';

import type {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import InputField from '@/components/common/InputField';
import CustomKeyboardAvoidingView from '@/components/keyboard/CustomKeyboardAvoidingView';
import MarkerSelector from '@/components/MarkerSelector';
import AddLocationRightHeader from '@/components/AddLocationRightHeader';
import CustomButton from '@/components/common/CustomButton';
import DatePickerModal from '@/components/modal/DatePickerModal';
import InputImagesViewer from '@/components/InputImagesViewer';
import {useCreateMarker} from '@/hooks/queries/useMarker';
import useGetAddress from '@/hooks/common/useGetAddress';
import useDatePicker from '@/hooks/common/useDatePicker';
import useForm from '@/hooks/common/useForm';
import {validateAddLocation} from '@/utils/validate';
import {getDateWithSeparator} from '@/utils/date';
import {mapNavigations} from '@/constants/navigations';
import {colors} from '@/constants/colors';
import type {MarkerColor} from '@/types/api';

type AddLocationScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_LOCATION
>;

function AddLocationScreen({route, navigation}: AddLocationScreenProps) {
  const {location} = route.params;
  const markerMutation = useCreateMarker();
  const descriptionRef = useRef<TextInput | null>(null);
  const [marker, setMarker] = useState<MarkerColor>('RED');
  const datePicker = useDatePicker(new Date());
  const address = useGetAddress(location);
  const addLocation = useForm({
    initialValue: {title: '', description: ''},
    validate: validateAddLocation,
  });

  const handleSubmit = useCallback(() => {
    markerMutation.mutate(
      {
        latitude: location.latitude,
        longitude: location.longitude,
        color: marker,
        title: addLocation.values.title,
        description: addLocation.values.description,
        address,
        date: datePicker.date,
      },
      {
        onSuccess: () => navigation.goBack(),
      },
    );
  }, [
    markerMutation,
    location,
    marker,
    addLocation.values,
    address,
    datePicker.date,
    navigation,
  ]);

  const handleSelectMarker = (name: MarkerColor) => {
    setMarker(name);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        AddLocationRightHeader(handleSubmit, addLocation.hasErrors),
    });
  }, [handleSubmit, navigation, addLocation.hasErrors]);

  return (
    <SafeAreaView style={styles.container}>
      <CustomKeyboardAvoidingView>
        <ScrollView
          style={styles.contentContainer}
          scrollIndicatorInsets={{right: 1}}>
          <View style={styles.inputContainer}>
            <InputField
              value={address}
              disabled={true}
              icon={
                <Octicons name="location" size={16} color={colors.GRAY_500} />
              }
            />
            <CustomButton
              variant="outlined"
              label={
                datePicker.isPicked
                  ? `${getDateWithSeparator(datePicker.date, '. ')}`
                  : '날짜 선택'
              }
              onPress={datePicker.showModal}
            />
            <InputField
              {...addLocation.getTextInputProps('title')}
              error={addLocation.errors.title}
              touched={addLocation.touched.title}
              placeholder="제목을 입력하세요."
              maxLength={30}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                descriptionRef.current?.focus();
              }}
            />
            <InputField
              {...addLocation.getTextInputProps('description')}
              error={addLocation.errors.description}
              touched={addLocation.touched.description}
              ref={descriptionRef}
              placeholder="기록하고 싶은 내용을 입력하세요. (선택)"
              maxLength={1000}
              returnKeyType="next"
              multiline
            />
            <MarkerSelector
              marker={marker}
              onPressMarker={handleSelectMarker}
            />
            <DatePickerModal
              date={datePicker.date}
              isVisible={datePicker.isVisible}
              onChangeDate={datePicker.handleChange}
              onConfirmDate={datePicker.handleConfirm}
            />
            <InputImagesViewer />
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
});

export default AddLocationScreen;
