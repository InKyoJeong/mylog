import {numbers} from './numbers';

const errorMessages = {
  INVALID_USERNAME_FORMAT: '아이디는 영어 또는 숫자로 입력해주세요.',
  INVALID_USERNAME_LENGTH: `아이디는 ${numbers.MIN_USERNAME_LENGTH}~${numbers.MAX_USERNAME_LENGTH}자 이내로 입력해주세요.`,
  INVALID_PASSWORD_FORMAT: '비밀번호는 영어, 숫자, 특수문자만 입력가능합니다.',
  INVALID_PASSWORD_LENGTH: `비밀번호는 ${numbers.MIN_PASSWORD_LENGTH}~${numbers.MAX_PASSWORD_LENGTH}자 이내로 입력해주세요.`,
  INVALID_NICKNAME: `닉네임은 빈칸없이 ${numbers.MIN_NICKNAME_LENGTH}~${numbers.MAX_NICKNAME_LENGTH}자 이내로 입력해주세요.`,
  INVALID_EMAIL_FORMAT: '올바른 이메일 형식이 아닙니다.',
  NOT_MATCH_PASSWORD: '비밀번호가 일치하지 않습니다.',
  INVALID_POST_TITLE_LENGTH: `제목은 ${numbers.MIN_POST_TITLE_LENGTH}글자 이상 입력해주세요.`,
  INVALID_FEEDBACK_TITLE_LENGTH: `제목은 ${numbers.MIN_FEEDBACK_TITLE_LENGTH}글자 이상 입력해주세요.`,
  INVALID_FEEDBACK_DESCRIPTION_LENGTH: `내용은 ${numbers.MIN_FEEDBACK_DESCRIPTION_LENGTH}글자 이상 입력해주세요.`,
  CANNOT_GET_ADDRESS: '주소를 알 수 없습니다.',
  CANNOT_ACCESS_PHOTO:
    '갤러리를 열 수 없어요.\n권한을 허용했는지 확인해주세요.',
  CANNOT_ACCESS_USER_LOCATION: '위치 권한을 허용해주세요.',
} as const;

const successMessages = {
  SUCCESS_ADD_BOOKMARK: '북마크 되었습니다.',
  SUCCESS_EDIT_PROFILE: '프로필이 변경되었습니다.',
} as const;

const alerts = {
  EXCEED_MULTIPLE_IMAGE_COUNT: {
    TITLE: '이미지 개수 초과',
    DESCRIPTION: `추가 가능한 이미지는 최대 ${numbers.MAX_UPLOADER_MULTIPLE_IMAGE}개입니다.`,
  },
  EXCEED_SINGLE_IMAGE_COUNT: {
    TITLE: '이미지 개수 초과',
    DESCRIPTION: '이미지는 1개만 선택가능합니다.',
  },
  NOT_SELECTED_LOCATION: {
    TITLE: '추가할 위치를 선택해주세요',
    DESCRIPTION: '지도를 길게 누르면 위치가 선택됩니다.',
  },
  LOCATION_PERMISSION: {
    TITLE: '위치 권한 허용이 필요합니다',
    DESCRIPTION: '설정 화면에서 위치 권한을 허용해주세요.',
  },
  PHOTO_PERMISSION: {
    TITLE: '사진 접근 권한이 필요합니다',
    DESCRIPTION: '설정 화면에서 사진 권한을 허용해주세요.',
  },
  DELETE_POST: {
    TITLE: '삭제하시겠습니까?',
    DESCRIPTION: '피드와 지도에서 모두 삭제됩니다.',
  },
} as const;

export {errorMessages, successMessages, alerts};
