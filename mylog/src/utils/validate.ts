import {getObjectWithValue} from '.';
import {errorMessages} from '@/constants/messages';
import {numbers} from '@/constants/numbers';

type LoginInfo = {
  username: string;
  password: string;
};

type SignupInfo = LoginInfo & {
  passwordConfirm: string;
};

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

function validateUser(
  errors: Record<keyof LoginInfo, string>,
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

function validateLogin(values: LoginInfo) {
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

export {validateLogin, validateSignup};
