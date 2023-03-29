import {errorMessages} from '@/constants/messages';
import {numbers} from '@/constants/numbers';
import {getObjectWithValue} from '.';

type LoginInfo = {
  username: string;
  password: string;
};

const validateLogin = (values: LoginInfo) => {
  const errors = getObjectWithValue(
    Object.keys(values) as (keyof LoginInfo)[],
    '',
  );
  const {username, password} = values;

  if (!/^[a-zA-Z0-9]*$/.test(username)) {
    errors.username = errorMessages.INVALID_USERNAME_FORMAT;
  }
  if (
    username.length < numbers.MIN_USERNAME_LENGTH ||
    username.length > numbers.MAX_USERNAME_LENGTH
  ) {
    errors.username = errorMessages.INVALID_USERNAME_LENGTH;
  }

  if (!/^[a-zA-Z0-9`'~!@#$%^&*()-_=+]*$/.test(password)) {
    errors.password = errorMessages.INVALID_PASSWORD_FORMAT;
  }
  if (
    password.length < numbers.MIN_PASSWORD_LENGTH ||
    password.length > numbers.MAX_PASSWORD_LENGTH
  ) {
    errors.password = errorMessages.INVALID_PASSWORD_LENGTH;
  }

  return errors;
};

export {validateLogin};
