import React, {PropsWithChildren, createContext, useContext} from 'react';
import {
  GestureResponderEvent,
  Modal,
  ModalProps,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Config from 'react-native-config';

import {getDateWithSeparator} from '@/utils/date';
import {colors} from '@/constants/colors';
import type {ImageUri} from '@/types/domain';

interface ModalContextValue {
  onClickOutSide?: (event: GestureResponderEvent) => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

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
  const onClickOutSide = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) {
      hideModal();
    }
  };

  return (
    <Modal
      animationType={animationType}
      transparent={true}
      visible={isVisible}
      onRequestClose={hideModal}
      {...props}>
      <ModalContext.Provider value={{onClickOutSide}}>
        {children}
      </ModalContext.Provider>
    </Modal>
  );
}

function CardBackground({children}: PropsWithChildren) {
  const modalContext = useContext(ModalContext);

  return (
    <View style={styles.container} onTouchEnd={modalContext?.onClickOutSide}>
      {children}
    </View>
  );
}

function OptionBackground({children}: PropsWithChildren) {
  const modalContext = useContext(ModalContext);

  return (
    <SafeAreaView
      style={[styles.container, styles.optionContainer]}
      onTouchEnd={modalContext?.onClickOutSide}>
      {children}
    </SafeAreaView>
  );
}

function Card({children}: PropsWithChildren) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardInner}>{children}</View>
    </View>
  );
}

interface GoNextButtonProps {
  onPress: () => void;
}

function GoNextButton({onPress}: GoNextButtonProps) {
  return (
    <Pressable style={styles.goNextButton} onPress={onPress}>
      <MaterialIcons name="arrow-forward-ios" size={20} color={colors.BLACK} />
    </Pressable>
  );
}

function OptionButtonList({children}: PropsWithChildren) {
  return <View style={styles.optionButtonContainer}>{children}</View>;
}

interface OptionButtonProps {
  onPress: () => void;
  isDanger?: boolean;
}

function OptionButton({
  children,
  isDanger = false,
  onPress,
}: PropsWithChildren<OptionButtonProps>) {
  return (
    <Pressable
      style={({pressed}) => [
        pressed && styles.optionButtonPressed,
        styles.optionButton,
      ]}
      onPress={onPress}>
      <Text style={[styles.optionText, isDanger && styles.dangerText]}>
        {children}
      </Text>
    </Pressable>
  );
}

function OptionBorder() {
  return <View style={styles.border} />;
}

interface CardImageProps {
  imageUris: ImageUri[];
}

function CardImage({imageUris}: CardImageProps) {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={
          imageUris.length
            ? {uri: `${Config.BACK_URL}/${imageUris[0].uri}`}
            : require('@/assets/modal-marker-default.png')
        }
        style={styles.image}
      />
    </View>
  );
}

interface MarkerInfoProps {
  address: string;
  title: string;
  date: Date | string;
}

function MarkerInfo({address, date, title}: MarkerInfoProps) {
  return (
    <View style={styles.markerInfoContainer}>
      <View style={styles.addressContainer}>
        <Octicons name="location" size={10} color={colors.GRAY_500} />
        <Text style={styles.addressText} ellipsizeMode="tail" numberOfLines={1}>
          {address}
        </Text>
      </View>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.dateText}>{getDateWithSeparator(date, '.')}</Text>
    </View>
  );
}

export const CompoundModal = Object.assign(ModalMain, {
  CardBackground,
  OptionBackground,
  Card,
  CardImage,
  MarkerInfo,
  OptionButtonList,
  OptionButton,
  OptionBorder,
  GoNextButton,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  optionContainer: {
    backgroundColor: 'rgba(0 0 0 / 0.5)',
  },
  cardContainer: {
    backgroundColor: colors.WHITE,
    marginHorizontal: 10,
    marginBottom: 40,
    borderRadius: 25,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.5,
    elevation: 2,
  },
  cardInner: {
    padding: 20,
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
  markerInfoContainer: {
    width: Dimensions.get('screen').width / 2,
    marginLeft: 15,
    gap: 5,
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
    fontSize: 15,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.PINK_700,
  },
  descriptionText: {
    fontSize: 14,
  },
  goNextButton: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  optionButtonContainer: {
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: colors.GRAY_100,
    overflow: 'hidden',
  },
  optionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  optionButtonPressed: {
    opacity: 0.4,
  },
  optionText: {
    fontSize: 16,
  },
  border: {
    borderBottomColor: colors.GRAY_300,
    borderBottomWidth: 1,
  },
  dangerText: {
    color: colors.RED_500,
  },
});
