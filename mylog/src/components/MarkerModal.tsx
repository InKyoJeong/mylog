import React from 'react';
import {
  Text,
  View,
  Modal,
  Dimensions,
  GestureResponderEvent,
  ScrollView,
  StyleSheet,
} from 'react-native';

import useModalStore from '@/store/useModalStore';
import {useGetMarker} from '@/hooks/queries/useMarker';
import {colors} from '@/constants/colors';

function MarkerModal() {
  const {isVisible, markerId, hideModal} = useModalStore();
  const {data: marker, isLoading, isError} = useGetMarker(markerId);

  const handleOuterClick = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) {
      hideModal();
    }
  };

  // TODO: suspense & fallback
  if (isLoading || isError) {
    return <></>;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={hideModal}>
      <View style={styles.container} onTouchEnd={handleOuterClick}>
        <ScrollView style={styles.modalScroll}>
          <View style={styles.modalInner}>
            <Text>{marker.title}</Text>
            <Text>{marker.description}</Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalScroll: {
    maxHeight: Dimensions.get('screen').height / 3,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: colors.GRAY_500,
  },
  modalInner: {
    padding: 30,
  },
});

export default MarkerModal;
