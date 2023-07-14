import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import {describe, expect, it} from '@jest/globals';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import LoginScreen from '@/screens/auth/LoginScreen';
import {errorMessages} from '@/constants';
import {fillAndBlurInput} from './utils';

const queryClient = new QueryClient();

const renderLoginScreen = () => {
  return render(
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <LoginScreen />
      </QueryClientProvider>
    </NavigationContainer>,
  );
};

describe('LoginScreen 테스트', () => {
  it('이메일 입력 필드에 유효하지 않은 이메일을 입력하면 에러 메시지가 표시된다.', () => {
    const {getByPlaceholderText, queryByText} = renderLoginScreen();

    const emailInput = getByPlaceholderText('이메일');
    fillAndBlurInput(emailInput, 'test');

    const errorMessage = queryByText(errorMessages.INVALID_EMAIL_FORMAT);
    expect(errorMessage).not.toBeNull();
  });

  it('비밀번호 입력 필드에 유효하지 않은 비밀번호를 입력하면 에러 메시지가 표시된다.', () => {
    const {getByPlaceholderText, queryByText} = renderLoginScreen();

    const passwordInput = getByPlaceholderText('비밀번호');
    fillAndBlurInput(passwordInput, '1234');

    const errorMessage = queryByText(errorMessages.INVALID_PASSWORD_LENGTH);
    expect(errorMessage).not.toBeNull();
  });
});
