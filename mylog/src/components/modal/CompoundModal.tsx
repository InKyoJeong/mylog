import React, {PropsWithChildren, createContext, useContext} from 'react';
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
  SafeAreaView,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

import {colors} from '@/constants/colors';

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

function DialogContainer({children}: PropsWithChildren) {
  const modalContext = useContext(ModalContext);

  return (
    <View style={styles.container} onTouchEnd={modalContext?.onClickOutSide}>
      {children}
    </View>
  );
}

function OptionContainer({children}: PropsWithChildren) {
  const modalContext = useContext(ModalContext);

  return (
    <SafeAreaView
      style={[styles.container, styles.optionContainer]}
      onTouchEnd={modalContext?.onClickOutSide}>
      {children}
    </SafeAreaView>
  );
}

function Scroll({children}: PropsWithChildren) {
  return (
    <ScrollView style={styles.modalScroll}>
      <View style={styles.modalInner}>{children}</View>
    </ScrollView>
  );
}

function Address({children}: PropsWithChildren) {
  return (
    <View style={styles.addressContainer}>
      <Octicons name="location" size={10} color={colors.GRAY_500} />
      <Text style={styles.addressText}>{children}</Text>
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
    <Pressable style={styles.optionButton} onPress={onPress}>
      <Text style={isDanger && styles.dangerText}>{children}</Text>
    </Pressable>
  );
}

interface MarkerInfoProps {
  imageUrl?: string;
  date: string;
  title: string;
}

function MarkerInfo({imageUrl, date, title}: MarkerInfoProps) {
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
        <Text style={styles.dateText}>{date}</Text>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </View>
  );
}

export const CompoundModal = Object.assign(ModalMain, {
  DialogContainer,
  OptionContainer,
  OptionButtonList,
  OptionButton,
  Scroll,
  Date,
  Address,
  Description,
  GoNextButton,
  MarkerInfo,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  optionContainer: {
    backgroundColor: 'rgba(0 0 0 / 0.5)',
  },
  modalScroll: {
    maxHeight: Dimensions.get('screen').height / 4,
    backgroundColor: colors.WHITE,
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.GRAY_500,
  },
  modalInner: {
    padding: 20,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
    marginBottom: 10,
  },
  addressText: {
    color: colors.GRAY_500,
    fontSize: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.PINK_700,
  },
  descriptionText: {
    fontSize: 14,
  },
  goNextButtonContainer: {
    alignItems: 'flex-end',
    marginRight: 15,
    marginBottom: 5,
  },
  goNextButton: {
    backgroundColor: colors.PINK_700,
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    elevation: 2,
  },
  optionButtonContainer: {
    borderRadius: 15,
    marginHorizontal: 10,
    backgroundColor: colors.GRAY_100,
  },
  optionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  dangerText: {
    color: colors.RED_500,
  },
});
