import {getObjectWithValue} from './common';
import {numbers, errorMessages} from '@/constants';
import type {RequestUser, RequestFeedback, RequestCreatePost} from '@/api';
import type {Category, MarkerColor} from '@/types';

function isBlank(value: string) {
  return value.trim() === '';
}

function hasBlankString(value: string) {
  return value.includes(' ');
}

function isStartsWithWhitespace(str: string) {
  return /^\s/.test(str);
}

function isValidEmailFormat(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPasswordFormat(password: string) {
  return /^[a-zA-Z0-9`'~!@#$%^&*()-_=+]*$/.test(password);
}

function isValidPasswordLength(password: string) {
  return (
    password.length >= numbers.MIN_PASSWORD_LENGTH &&
    password.length <= numbers.MAX_PASSWORD_LENGTH
  );
}

function isValidNicknameLength(nickname: string) {
  return (
    nickname.length >= numbers.MIN_NICKNAME_LENGTH &&
    nickname.length <= numbers.MAX_NICKNAME_LENGTH
  );
}

function isValidFeedbackTitleLength(title: string) {
  return title.length >= numbers.MIN_FEEDBACK_TITLE_LENGTH;
}

function isValidFeedbackDescriptionLength(title: string) {
  return title.length >= numbers.MIN_FEEDBACK_DESCRIPTION_LENGTH;
}

type UserInfomation = RequestUser & {
  passwordConfirm?: string;
};

function validateEmail(
  errors: Record<keyof UserInfomation, string>,
  email: string,
) {
  if (!isValidEmailFormat(email)) {
    errors.email = errorMessages.INVALID_EMAIL_FORMAT;
  }

  return errors;
}

function validatePassword(
  errors: Record<keyof UserInfomation, string>,
  password: string,
  passwordConfirm?: string,
  checkConfirm?: boolean,
) {
  if (!isValidPasswordFormat(password)) {
    errors.password = errorMessages.INVALID_PASSWORD_FORMAT;
  }
  if (!isValidPasswordLength(password)) {
    errors.password = errorMessages.INVALID_PASSWORD_LENGTH;
  }

  if (checkConfirm && password !== passwordConfirm) {
    errors.passwordConfirm = errorMessages.NOT_MATCH_PASSWORD;
  }

  return errors;
}

function validateLogin(values: UserInfomation) {
  const {email, password} = values;
  const errors = getObjectWithValue(Object.keys(values), '');

  const emailErrors = validateEmail(errors, email);
  const loginErrors = validatePassword(emailErrors, password);

  return loginErrors;
}

function validateSignup(values: UserInfomation) {
  const {email, password, passwordConfirm} = values;
  const errors = getObjectWithValue(Object.keys(values), '');

  const emailErrors = validateEmail(errors, email);
  const signupErrors = validatePassword(
    emailErrors,
    password,
    passwordConfirm,
    true,
  );

  return signupErrors;
}

function validateAddPost(values: Pick<RequestCreatePost, 'title'>) {
  const {title} = values;
  const errors = getObjectWithValue(Object.keys(values), '');

  if (isBlank(title)) {
    errors.title = errorMessages.INVALID_POST_TITLE_LENGTH;
  }

  return errors;
}

function validateEditProfile(values: {nickname: string}) {
  const {nickname} = values;
  const errors = getObjectWithValue(Object.keys(values), '');

  if (hasBlankString(nickname) || !isValidNicknameLength(nickname)) {
    errors.nickname = errorMessages.INVALID_NICKNAME;
  }

  return errors;
}

function validateAddFeedback(values: RequestFeedback) {
  const {email, title, description} = values;
  const errors = getObjectWithValue(Object.keys(values), '');

  if (!isValidEmailFormat(email)) {
    errors.email = errorMessages.INVALID_EMAIL_FORMAT;
  }
  if (isBlank(title) || !isValidFeedbackTitleLength(title)) {
    errors.title = errorMessages.INVALID_FEEDBACK_TITLE_LENGTH;
  }
  if (isBlank(description) || !isValidFeedbackDescriptionLength(description)) {
    errors.description = errorMessages.INVALID_FEEDBACK_DESCRIPTION_LENGTH;
  }

  return errors;
}

function validateCategory(values: Category) {
  const errors = getObjectWithValue(Object.keys(values), '');

  (Object.keys(values) as MarkerColor[]).map(value => {
    if (isStartsWithWhitespace(values[value])) {
      errors[value] = errorMessages.INVALID_CATEGORY_FORMAT;
    }
  });

  return errors;
}

function validateFriendId(values: {friendId: string}) {
  const {friendId} = values;
  const errors = getObjectWithValue(Object.keys(values), '');

  if (isBlank(friendId)) {
    errors.friendId = errorMessages.INVALID_FRIEND_ID;
  }

  return errors;
}

export {
  validateLogin,
  validateSignup,
  validateAddPost,
  validateEditProfile,
  validateAddFeedback,
  validateCategory,
  validateFriendId,
};
