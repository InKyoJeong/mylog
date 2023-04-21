import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';

import {mapNavigations} from '@/constants/navigations';
import type {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {useCreateMarker} from '@/hooks/queries/useMarker';

type AddLocationScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_LOCATION
>;

function AddLocationScreen({route, navigation}: AddLocationScreenProps) {
  const {location} = route.params;
  const markerMutation = useCreateMarker();

  const handleSubmit = () => {
    markerMutation.mutate(
      {
        latitude: location.latitude,
        longitude: location.longitude,
        title: '제목',
        description: '설명',
        color: 'BLUE',
      },
      {
        onSuccess: () => navigation.goBack(),
      },
    );
  };

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Text>추가할 위치</Text>
          <Text>{location.latitude}</Text>
          <Text>{location.longitude}</Text>
          <Button title="등록" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AddLocationScreen;
