import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import {describe, expect, it} from '@jest/globals';
import {NavigationContainer} from '@react-navigation/native';

import SignupScreen from '@/screens/auth/SignupScreen';
import {errorMessages} from '@/constants';
import {fillAndBlurInput} from './utils';

const renderSignupScreen = () => {
  return render(
    <NavigationContainer>
      <SignupScreen />
    </NavigationContainer>,
  );
};

describe('SignupScreen 테스트', () => {
  it('이메일 입력 필드에 유효하지 않은 이메일을 입력하면 에러 메시지가 표시된다.', () => {
    const {getByPlaceholderText, queryByText} = renderSignupScreen();

    const emailInput = getByPlaceholderText('이메일');
    fillAndBlurInput(emailInput, 'test');

    const errorMessage = queryByText(errorMessages.INVALID_EMAIL_FORMAT);
    expect(errorMessage).not.toBeNull();
  });

  it('비밀번호 입력 필드에 유효하지 않은 비밀번호를 입력하면 에러 메시지가 표시된다.', () => {
    const {getByPlaceholderText, queryByText} = renderSignupScreen();

    const passwordInput = getByPlaceholderText('비밀번호');
    fillAndBlurInput(passwordInput, 'test1234');

    const errorMessage = queryByText(errorMessages.INVALID_PASSWORD_FORMAT);
    expect(errorMessage).not.toBeNull();
  });

  it('비밀번호 확인 필드가 일치하지 않으면 에러 메시지가 표시된다.', () => {
    const {getByPlaceholderText, queryByText} = renderSignupScreen();

    const passwordInput = getByPlaceholderText('비밀번호');
    fillAndBlurInput(passwordInput, 'test1234!');

    const passwordConfirmInput = getByPlaceholderText('비밀번호 확인');
    fillAndBlurInput(passwordConfirmInput, 'test!!!!');

    const errorMessage = queryByText(errorMessages.NOT_MATCH_PASSWORD);
    expect(errorMessage).not.toBeNull();
  });
});
