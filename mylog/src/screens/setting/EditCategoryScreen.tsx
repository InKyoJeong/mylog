import React, {useCallback, useLayoutEffect, useRef} from 'react';
import {
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import Animated, {StretchInY} from 'react-native-reanimated';
import type {StackScreenProps} from '@react-navigation/stack';

import type {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import EditCategoryHeaderRight from '@/components/setting/EditCategoryHeaderRight';
import CustomKeyboardAvoidingView from '@/components/@keyboard/CustomKeyboardAvoidingView';
import InputField from '@/components/@common/InputField';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import useSnackbarStore from '@/store/useSnackbarStore';
import {validateCategory} from '@/utils/validate';
import {colorHex, colors} from '@/constants/colors';
import {successMessages} from '@/constants/messages';
import {numbers} from '@/constants/numbers';
import type {MarkerColor} from '@/types/domain';

type EditCategoryScreenProps = StackScreenProps<SettingStackParamList>;

function EditCategoryScreen({navigation}: EditCategoryScreenProps) {
  const snackbar = useSnackbarStore();
  const refArray = useRef<(TextInput | null)[]>([]);
  const {getProfileQuery, categoryMutation} = useAuth();
  const {RED, YELLOW, GREEN, BLUE, PURPLE} = getProfileQuery.data || {};
  const category = useForm({
    initialValue: {
      RED: RED ?? '',
      YELLOW: YELLOW ?? '',
      GREEN: GREEN ?? '',
      BLUE: BLUE ?? '',
      PURPLE: PURPLE ?? '',
    },
    validate: validateCategory,
  });

  const handleSubmit = useCallback(() => {
    categoryMutation.mutate(category.values, {
      onSuccess: () => snackbar.show(successMessages.SUCCESS_SAVE),
    });
  }, [category.values, categoryMutation, snackbar]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        EditCategoryHeaderRight(handleSubmit, category.hasErrors),
    });
  }, [category.hasErrors, handleSubmit, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <CustomKeyboardAvoidingView>
        <ScrollView
          style={styles.contentContainer}
          scrollIndicatorInsets={{right: 1}}>
          <Animated.View entering={StretchInY} style={styles.infoContainer}>
            <Text style={styles.infoText}>
              마커 색상의 카테고리를 설정해주세요.
            </Text>
            <Text style={styles.infoText}>
              마커 필터링, 범례 표시에 사용할 수 있어요.
            </Text>
          </Animated.View>

          <View style={styles.formContainer}>
            {['RED', 'YELLOW', 'GREEN', 'BLUE', 'PURPLE'].map((color, i) => {
              return (
                <View key={i} style={styles.categoryContainer}>
                  <View
                    style={[
                      styles.category,
                      {backgroundColor: colorHex[color as MarkerColor]},
                    ]}
                  />
                  <View style={styles.inputContainer}>
                    <InputField
                      {...category.getTextInputProps(color as MarkerColor)}
                      autoFocus={color === 'RED'}
                      error={category.errors[color]}
                      touched={category.touched[color]}
                      ref={el => (refArray.current[i] = el)}
                      maxLength={numbers.MAX_CATEGORY_LENGTH}
                      returnKeyType="next"
                      blurOnSubmit={false}
                      onSubmitEditing={() => {
                        refArray.current[i + 1]?.focus();
                      }}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </CustomKeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: colors.PINK_700,
    borderRadius: 3,
    padding: 10,
    gap: 10,
  },
  infoText: {
    color: colors.PINK_700,
    fontSize: 15,
    fontWeight: '600',
  },
  formContainer: {
    gap: 15,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  category: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colorHex.RED,
    borderWidth: 1,
    borderColor: colors.GRAY_700,
  },
  inputContainer: {
    flex: 1,
  },
});

export default EditCategoryScreen;
