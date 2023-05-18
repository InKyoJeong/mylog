import React, {useRef} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';

import InputField from '@/components/@common/InputField';
import CustomButton from '@/components/@common/CustomButton';
import CustomKeyboardAvoidingView from '@/components/@keyboard/CustomKeyboardAvoidingView';

function FeedbackScreen() {
  const titleRef = useRef<TextInput | null>(null);
  const descriptionRef = useRef<TextInput | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <CustomKeyboardAvoidingView>
        <ScrollView
          style={styles.contentContainer}
          scrollIndicatorInsets={{right: 1}}>
          <View style={styles.inputContainer}>
            <InputField
              placeholder="이메일을 입력해주세요."
              maxLength={100}
              inputMode="email"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                titleRef.current?.focus();
              }}
            />
            <InputField
              ref={titleRef}
              placeholder="제목을 입력해주세요."
              maxLength={100}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                descriptionRef.current?.focus();
              }}
            />
            <InputField
              ref={descriptionRef}
              placeholder="자유롭게 의견을 입력해주세요."
              multiline
              maxLength={3000}
            />
            <CustomButton label="제출" variant="filled" size="large" />
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
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
});

export default FeedbackScreen;
