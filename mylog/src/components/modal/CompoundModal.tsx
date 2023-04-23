import React, {PropsWithChildren} from 'react';
import {
  GestureResponderEvent,
  Modal,
  ModalProps,
  Pressable,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

import {colors} from '@/constants/colors';

interface ModalMainProps extends ModalProps {
  isVisible: boolean;
  hideModal: () => void;
}

function ModalMain({
  children,
  isVisible,
  hideModal,
  animationType = 'slide',
  ...props
}: PropsWithChildren<ModalMainProps>) {
  const handleOuterClick = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) {
      hideModal();
    }
  };

  return (
    <Modal
      {...props}
      animationType={animationType}
      transparent={true}
      visible={isVisible}
      onRequestClose={hideModal}>
      <View style={styles.container} onTouchEnd={handleOuterClick}>
        {children}
      </View>
    </Modal>
  );
}

function Scroll({children}: PropsWithChildren) {
  return (
    <ScrollView style={styles.modalScroll}>
      <View style={styles.modalInner}>{children}</View>
    </ScrollView>
  );
}

function Date({children}: PropsWithChildren) {
  return (
    <View style={styles.navContainer}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{children}</Text>
      </View>
    </View>
  );
}

function Description({children}: PropsWithChildren) {
  return <Text style={styles.descriptionText}>{children}</Text>;
}

interface GoNextButtonProps {
  onPress: () => void;
}

function GoNextButton({onPress}: GoNextButtonProps) {
  return (
    <View style={styles.goNextButtonContainer}>
      <Pressable style={styles.goNextButton} onPress={onPress}>
        <Octicons name="arrow-right" size={30} color={colors.WHITE} />
      </Pressable>
    </View>
  );
}

interface MarkerInfoProps {
  imageUrl?: string;
  address?: string;
  title: string;
}

function MarkerInfo({imageUrl, address, title}: MarkerInfoProps) {
  return (
    <View style={styles.infoContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={
            imageUrl ? {uri: imageUrl} : require('@/assets/modal-default.png')
          }
          style={styles.image}
        />
      </View>
      <View style={styles.titleContainer}>
        {address && (
          <View style={styles.addressContainer}>
            <Octicons name="location" size={10} color={colors.GRAY_500} />
            <Text style={styles.addressText}>{address}</Text>
          </View>
        )}
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </View>
  );
}

export const CompoundModal = Object.assign(ModalMain, {
  Scroll,
  Date,
  Description,
  GoNextButton,
  MarkerInfo,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0 0 0 / 0)',
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
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
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
  goNextButtonContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  goNextButton: {
    backgroundColor: colors.PINK_700,
    width: 45,
    height: 45,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
