import {getObjectWithValue} from '.';
import type {RequestFeedback} from '@/api/feedback';
import type {RequestUser} from '@/api/auth';
import {errorMessages} from '@/constants/messages';
import {numbers} from '@/constants/numbers';
import type {RequestCreatePost} from '@/api/post';
import type {Category} from '@/types/domain';

function isBlank(value: string) {
  return value.trim() === '';
}

function hasBlankString(value: string) {
  return value.includes(' ');
}

function isValidEmailFormat(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUsernameFormat(username: string) {
  return /^[a-zA-Z0-9]*$/.test(username);
}

function isValidPasswordFormat(password: string) {
  return /^[a-zA-Z0-9`'~!@#$%^&*()-_=+]*$/.test(password);
}

function isValidUsernameLength(username: string) {
  return (
    username.length >= numbers.MIN_USERNAME_LENGTH &&
    username.length <= numbers.MAX_USERNAME_LENGTH
  );
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
  username: string,
  password: string,
) {
  if (!isValidUsernameFormat(username)) {
    errors.username = errorMessages.INVALID_USERNAME_FORMAT;
  }
  if (!isValidUsernameLength(username)) {
    errors.username = errorMessages.INVALID_USERNAME_LENGTH;
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
  const {username, password} = values;

  const errors = getObjectWithValue(Object.keys(values), '');
  const userErrors = validateUser(errors, username, password);

  return {...errors, ...userErrors};
}

function validateSignup(values: SignupInfo) {
  const {username, password, passwordConfirm} = values;

  const errors = getObjectWithValue(Object.keys(values), '');
  const userErrors = validateUser(errors, username, password);
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
