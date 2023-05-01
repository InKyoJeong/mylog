import {numbers} from './numbers';

const errorMessages = {
  INVALID_USERNAME_FORMAT: '아이디는 영어 또는 숫자로 입력해주세요.',
  INVALID_USERNAME_LENGTH: `아이디는 ${numbers.MIN_USERNAME_LENGTH}~${numbers.MAX_USERNAME_LENGTH}자 이내로 입력해주세요.`,
  INVALID_PASSWORD_FORMAT: '비밀번호는 영어, 숫자, 특수문자만 입력가능합니다.',
  INVALID_PASSWORD_LENGTH: `비밀번호는 ${numbers.MIN_PASSWORD_LENGTH}~${numbers.MAX_PASSWORD_LENGTH}자 이내로 입력해주세요.`,
  NOT_MATCH_PASSWORD: '비밀번호가 일치하지 않습니다.',
  INVALID_TITLE_LENGTH: `제목은 ${numbers.MIN_TITLE_LENGTH}글자 이상 입력해주세요.`,
  CANNOT_GET_ADDRESS: '주소를 알 수 없습니다.',
} as const;

const alerts = {
  EXCEED_IMAGE_COUNT: {
    TITLE: '이미지 개수 초과',
    DESCRIPTION: `추가 가능한 이미지는 최대 ${numbers.MAX_UPLOADER_IMAGE}개입니다.`,
  },
  NOT_SELECTED_LOCATION: {
    TITLE: '추가할 위치를 선택해주세요',
    DESCRIPTION: '지도를 길게 누르면 위치가 선택됩니다.',
  },
};

export {errorMessages, alerts};
