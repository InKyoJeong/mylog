import React from 'react';
import {
  Text,
  View,
  Modal,
  Dimensions,
  GestureResponderEvent,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

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
            <View style={styles.navContainer}>
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>2023년 04월 23일</Text>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.ImageContainer}>
                <Image
                  source={require('@/assets/modal-default.png')}
                  style={styles.Image}
                />
              </View>
              <View style={styles.titleContainer}>
                <View style={styles.addressContainer}>
                  <Octicons name="location" size={10} color={colors.GRAY_500} />
                  <Text style={styles.addressText}>000-000 000길</Text>
                </View>
                <Text style={styles.titleText}>{marker.title}</Text>
              </View>
            </View>
            <Text style={styles.descriptionText}>{marker.description}</Text>
            <View style={styles.moveButtonContainer}>
              <Pressable style={styles.moveButton}>
                <Octicons name="arrow-right" size={30} color={colors.WHITE} />
              </Pressable>
            </View>
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
    maxHeight: Dimensions.get('screen').height / 3.5,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderWidth: 1,
    borderColor: colors.GRAY_500,
  },
  modalInner: {
    paddingVertical: 25,
    paddingHorizontal: 30,
  },
  navContainer: {
    alignItems: 'center',
  },
  dateContainer: {
    backgroundColor: colors.PINK_700,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginBottom: 15,
    borderRadius: 30,
  },
  dateText: {
    color: colors.WHITE,
    fontSize: 13,
    fontWeight: 'bold',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    // backgroundColor: 'red',
  },
  ImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  Image: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    gap: 8,
    marginLeft: 20,
  },
  addressContainer: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    color: colors.GRAY_500,
    fontSize: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 14,
  },
  moveButtonContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  moveButton: {
    backgroundColor: colors.PINK_700,
    width: 45,
    height: 45,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MarkerModal;
