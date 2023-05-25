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

function isMatchPasswordConfirm(password: string, passwordConfirm: string) {
  return password === passwordConfirm;
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
function validateUser(
  errors: Record<keyof RequestUser, string>,
  email: string,
  password: string,
) {
  if (!isValidEmailFormat(email)) {
    errors.email = errorMessages.INVALID_EMAIL_FORMAT;
  }
  if (!isValidPasswordFormat(password)) {
    errors.password = errorMessages.INVALID_PASSWORD_FORMAT;
  }
  if (!isValidPasswordLength(password)) {
    errors.password = errorMessages.INVALID_PASSWORD_LENGTH;
  }

  return errors;
}

type SignupInfo = RequestUser & {
  passwordConfirm: string;
};

function validatePasswordConfirm(
  errors: Record<keyof SignupInfo, string>,
  password: string,
  passwordConfirm: string,
) {
  if (!isValidPasswordFormat(passwordConfirm)) {
    errors.passwordConfirm = errorMessages.INVALID_PASSWORD_FORMAT;
  }
  if (!isValidPasswordLength(passwordConfirm)) {
    errors.passwordConfirm = errorMessages.INVALID_PASSWORD_LENGTH;
  }
  if (!isMatchPasswordConfirm(password, passwordConfirm)) {
    errors.passwordConfirm = errorMessages.NOT_MATCH_PASSWORD;
  }

  return errors;
}

function validateLogin(values: RequestUser) {
  const {email, password} = values;

  const errors = getObjectWithValue(Object.keys(values), '');
  const userErrors = validateUser(errors, email, password);

  return {...errors, ...userErrors};
}

function validateSignup(values: SignupInfo) {
  const {email, password, passwordConfirm} = values;

  const errors = getObjectWithValue(Object.keys(values), '');
  const userErrors = validateUser(errors, email, password);
  const passwordConfirmErrors = validatePasswordConfirm(
    errors,
    password,
    passwordConfirm,
  );

  return {...passwordConfirmErrors, ...userErrors};
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

export {
  validateLogin,
  validateSignup,
  validateAddPost,
  validateEditProfile,
  validateAddFeedback,
  validateCategory,
};
