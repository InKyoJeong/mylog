import React, {useRef} from 'react';
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
import {useCreateMarker} from '@/hooks/queries/useMarker';
import useGetAddress from '@/hooks/common/useGetAddress';
import useForm from '@/hooks/common/useForm';
import {validateAddLocation} from '@/utils/validate';
import {mapNavigations} from '@/constants/navigations';
import {colors} from '@/constants/colors';

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
  const descriptionRef = useRef<TextInput | null>(null);

  const handleSubmit = () => {
    markerMutation.mutate(
      {
        latitude: location.latitude,
        longitude: location.longitude,
        color: 'BLUE',
        title: '제목',
        description: '설명',
        address,
      },
      {
        onSuccess: () => navigation.goBack(),
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
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
          <Button title="등록" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
});

export default AddLocationScreen;
