import React, {useCallback, useLayoutEffect, useRef} from 'react';
import {
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import Animated, {BounceInUp} from 'react-native-reanimated';
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
import type {MarkerColor} from '@/types/domain';

type EditCategoryScreenProps = StackScreenProps<SettingStackParamList>;

function EditCategoryScreen({navigation}: EditCategoryScreenProps) {
  const snackbar = useSnackbarStore();
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

  const REDRef = useRef<TextInput | null>(null);
  const YELLOWRef = useRef<TextInput | null>(null);
  const GREENRef = useRef<TextInput | null>(null);
  const BLUERef = useRef<TextInput | null>(null);
  const PURPLERef = useRef<TextInput | null>(null);

  const refArray = [REDRef, YELLOWRef, GREENRef, BLUERef, PURPLERef, REDRef];

  const handleSubmit = useCallback(() => {
    categoryMutation.mutate(category.values, {
      onSuccess: () => snackbar.show('저장되었습니다.'),
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
          <Animated.View entering={BounceInUp} style={styles.infoContainer}>
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
                      ref={refArray[i]}
                      maxLength={8}
                      returnKeyType="next"
                      blurOnSubmit={false}
                      onSubmitEditing={() => {
                        refArray[i + 1].current?.focus();
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
  },
  inputContainer: {
    flex: 1,
  },
});

export default EditCategoryScreen;
