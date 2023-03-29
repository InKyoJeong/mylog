import {numbers} from './numbers';

const errorMessages = {
  INVALID_USERNAME_FORMAT: '아이디는 영어 또는 숫자로 입력해주세요.',
  INVALID_USERNAME_LENGTH: `아이디는 ${numbers.MIN_USERNAME_LENGTH}~${numbers.MAX_USERNAME_LENGTH}자 이내로 입력해주세요.`,
  INVALID_PASSWORD_FORMAT: '비밀번호는 영어, 숫자, 특수문자만 입력가능합니다.',
  INVALID_PASSWORD_LENGTH: `비밀번호는 ${numbers.MIN_PASSWORD_LENGTH}~${numbers.MAX_PASSWORD_LENGTH}자 이내로 입력해주세요.`,
} as const;

export {errorMessages};
