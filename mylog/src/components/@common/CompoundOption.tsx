import React, {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
} from 'react';
import {
  GestureResponderEvent,
  Modal,
  ModalProps,
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants';
import type {ThemeMode} from '@/types';

interface OptionContextValue {
  onClickOutSide?: (event: GestureResponderEvent) => void;
}

const OptionContext = createContext<OptionContextValue | undefined>(undefined);

interface OptionMainProps extends ModalProps {
  children: ReactNode;
  isVisible: boolean;
  hideOption: () => void;
}

function OptionMain({
  children,
  isVisible,
  hideOption,
  ...props
}: OptionMainProps) {
  const onClickOutSide = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) {
      hideOption();
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType={'slide'}
      onRequestClose={hideOption}
      {...props}>
      <OptionContext.Provider value={{onClickOutSide}}>
        {children}
      </OptionContext.Provider>
    </Modal>
  );
}

interface BackgroundProps {
  children: ReactNode;
  dimmed?: boolean;
}

function Background({children, dimmed = true}: BackgroundProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const optionContext = useContext(OptionContext);

  return (
    <SafeAreaView
      style={[styles.optionBackground, dimmed && styles.dimmed]}
      onTouchEnd={optionContext?.onClickOutSide}>
      {children}
    </SafeAreaView>
  );
}

function Container({children}: PropsWithChildren) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return <View style={styles.optionContainer}>{children}</View>;
}

interface ButtonProps {
  children: ReactNode;
  onPress: () => void;
  isDanger?: boolean;
  isChecked?: boolean;
}

function Button({
  children,
  isDanger = false,
  isChecked = false,
  onPress,
}: ButtonProps) {
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

function Divider() {
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

export const CompoundOption = Object.assign(OptionMain, {
  Background,
  Container,
  Button,
  Divider,
  Card,
});

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    optionBackground: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    dimmed: {
      backgroundColor: 'rgba(0 0 0 / 0.5)',
    },
    optionContainer: {
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
    cardContainer: {
      backgroundColor: colors[theme].WHITE,
      margin: 10,
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
  });
