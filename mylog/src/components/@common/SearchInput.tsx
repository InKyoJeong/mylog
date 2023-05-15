import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from '@/constants/colors';

interface SearchInputProps extends TextInputProps {
  onPress: () => void;
}

function SearchInput({onPress, ...props}: SearchInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholderTextColor={colors.GRAY_500}
        onSubmitEditing={onPress}
        clearButtonMode="while-editing"
        {...props}
      />
      <Ionicons
        name={'search'}
        color={colors.GRAY_700}
        size={25}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    paddingLeft: 0,
  },
});

export default SearchInput;
