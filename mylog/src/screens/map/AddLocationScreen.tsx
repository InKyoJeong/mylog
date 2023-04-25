import React, {useRef, useState} from 'react';
import {
  Button,
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
import {useCreateMarker} from '@/hooks/queries/useMarker';
import useGetAddress from '@/hooks/common/useGetAddress';
import useForm from '@/hooks/common/useForm';
import {validateAddLocation} from '@/utils/validate';
import {mapNavigations} from '@/constants/navigations';
import {colors} from '@/constants/colors';
import type {MarkerColor} from '@/types/api';

type AddLocationScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_LOCATION
>;

function AddLocationScreen({route, navigation}: AddLocationScreenProps) {
  const {location} = route.params;
  const address = useGetAddress(location);
  const markerMutation = useCreateMarker();
  const addLocation = useForm({
    initialValue: {title: '', description: ''},
    validate: validateAddLocation,
  });
  const [marker, setMarker] = useState<MarkerColor>('RED');
  const descriptionRef = useRef<TextInput | null>(null);

  const handleSubmit = () => {
    markerMutation.mutate(
      {
        latitude: location.latitude,
        longitude: location.longitude,
        color: marker,
        title: addLocation.values.title,
        description: addLocation.values.description,
        address,
      },
      {
        onSuccess: () => navigation.goBack(),
      },
    );
  };

  const handleSelectMarker = (name: MarkerColor) => {
    setMarker(name);
  };

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
            <InputField
              autoFocus
              {...addLocation.getTextInputProps('title')}
              error={addLocation.errors.title}
              touched={addLocation.touched.title}
              placeholder="제목을 입력하세요."
              maxLength={20}
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
              placeholder="기록하고 싶은 내용을 입력하세요. (선택)"
              maxLength={1000}
              returnKeyType="next"
              multiline
            />
            <MarkerSelector
              marker={marker}
              onPressMarker={handleSelectMarker}
            />

            <Button title="등록" onPress={handleSubmit} />
          </View>
        </ScrollView>
      </CustomKeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  contentContainer: {
    flex: 1,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
  markerInputContainer: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    paddingVertical: 15,
  },
  markerInputScroll: {
    flexDirection: 'row',
    gap: 20,
    marginHorizontal: 15,
  },
  markerLabel: {
    marginLeft: 15,
    marginBottom: 15,
    color: colors.GRAY_700,
  },
  markerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
  },
  pressedMarker: {
    borderWidth: 2,
    borderColor: colors.RED_500,
  },
});

export default AddLocationScreen;
