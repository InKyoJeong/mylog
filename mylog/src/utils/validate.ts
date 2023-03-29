import {getObjectWithValue} from '.';
import {errorMessages} from '@/constants/messages';
import {numbers} from '@/constants/numbers';

type LoginInfo = {
  username: string;
  password: string;
};

type SignupInfo = {
  username: string;
  password: string;
  passwordConfirm: string;
};

const isValidUsernameFormat = (username: string) => {
  return /^[a-zA-Z0-9]*$/.test(username);
};

const isValidPasswordFormat = (password: string) => {
  return /^[a-zA-Z0-9`'~!@#$%^&*()-_=+]*$/.test(password);
};

const isValidUsernameLength = (username: string) => {
  return (
    username.length >= numbers.MIN_USERNAME_LENGTH &&
    username.length <= numbers.MAX_USERNAME_LENGTH
  );
};

const isValidPasswordLength = (password: string) => {
  return (
    password.length >= numbers.MIN_PASSWORD_LENGTH &&
    password.length <= numbers.MAX_PASSWORD_LENGTH
  );
};

const isMatchPasswordConfirm = (password: string, passwordConfirm: string) => {
  return password === passwordConfirm;
};

const validateLogin = (values: LoginInfo) => {
  const errors = getObjectWithValue(
    Object.keys(values) as (keyof LoginInfo)[],
    '',
  );
  const {username, password} = values;

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
};

const validateSignup = (values: SignupInfo) => {
  const errors = getObjectWithValue(
    Object.keys(values) as (keyof SignupInfo)[],
    '',
  );
  const {username, password, passwordConfirm} = values;

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
};

export {validateLogin, validateSignup};
