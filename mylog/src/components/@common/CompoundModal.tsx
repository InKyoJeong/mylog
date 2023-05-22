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
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';

import Conditional from './Conditional';
import useThemeStore from '@/store/useThemeStore';
import CustomMarker from './CustomMarker';
import {colors} from '@/constants';
import type {ImageUri} from '@/types/domain';
import type {ThemeMode} from '@/types';

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
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const modalContext = useContext(ModalContext);

  return (
    <View style={styles.container} onTouchEnd={modalContext?.onClickOutSide}>
      {children}
    </View>
  );
}

function OptionBackground({children}: PropsWithChildren) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const modalContext = useContext(ModalContext);

  return (
    <SafeAreaView
      style={[styles.container, styles.optionContainer]}
      onTouchEnd={modalContext?.onClickOutSide}>
      {children}
    </SafeAreaView>
  );
}

function OptionButtonList({children}: PropsWithChildren) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return <View style={styles.optionButtonContainer}>{children}</View>;
}

interface OptionButtonProps {
  onPress: () => void;
  isDanger?: boolean;
  isChecked?: boolean;
}

function OptionButton({
  children,
  isDanger = false,
  isChecked = false,
  onPress,
}: PropsWithChildren<OptionButtonProps>) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

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

      {isChecked && (
        <Ionicons
          name="checkmark-circle"
          size={20}
          color={colors[theme].BLUE_500}
        />
      )}
    </Pressable>
  );
}

function OptionDivider() {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return <View style={styles.border} />;
}

function Card({children}: PropsWithChildren) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardInner}>{children}</View>
    </View>
  );
}

interface CardImageProps {
  imageUris: ImageUri[];
}

function CardImage({imageUris}: CardImageProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <>
      <Conditional condition={imageUris.length > 0}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `${Config.BASE_URL}/${imageUris[0]?.uri}`,
            }}
            style={styles.image}
          />
        </View>
      </Conditional>

      <Conditional condition={imageUris.length === 0}>
        <View style={[styles.imageContainer, styles.emptyImageContainer]}>
          <CustomMarker
            size="small"
            borderColor={colors[theme].GRAY_200}
            innerColor={colors[theme].WHITE}
          />
        </View>
      </Conditional>
    </>
  );
}

interface GoNextButtonProps {
  onPress: () => void;
}

function GoNextButton({onPress}: GoNextButtonProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable style={styles.goNextButton} onPress={onPress}>
      <MaterialIcons
        name="arrow-forward-ios"
        size={20}
        color={colors[theme].BLACK}
      />
    </Pressable>
  );
}

export const CompoundModal = Object.assign(ModalMain, {
  CardBackground,
  OptionBackground,
  OptionButtonList,
  OptionButton,
  OptionDivider,
  Card,
  CardImage,
  GoNextButton,
});

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    optionContainer: {
      backgroundColor: 'rgba(0 0 0 / 0.5)',
    },
    cardContainer: {
      backgroundColor: colors[theme].WHITE,
      marginHorizontal: 10,
      marginBottom: 40,
      borderRadius: 20,
      shadowColor: colors[theme].UNCHANGE_BLACK,
      shadowOffset: {width: 3, height: 3},
      shadowOpacity: 0.2,
      elevation: 1,
      borderColor: colors[theme].GRAY_500,
      borderWidth: 1.5,
    },
    cardInner: {
      padding: 20,
    },
    imageContainer: {
      width: 70,
      height: 70,
      borderRadius: 35,
    },
    emptyImageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors[theme].GRAY_200,
      borderRadius: 35,
      borderWidth: 1,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 35,
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
      backgroundColor: colors[theme].GRAY_100,
      overflow: 'hidden',
    },
    optionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      gap: 5,
    },
    optionButtonPressed: {
      backgroundColor: colors[theme].GRAY_200,
    },
    optionText: {
      fontSize: 17,
      color: colors[theme].BLUE_500,
      fontWeight: '500',
    },
    border: {
      borderBottomColor: colors[theme].GRAY_200,
      borderBottomWidth: 1,
    },
    dangerText: {
      color: colors[theme].RED_500,
    },
  });
