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
    errors.username = '아이디는 영어 또는 숫자로 입력해주세요.';
  }
  if (username.length < 4 || username.length > 20) {
    errors.username = '아이디는 4~20자 이내로 입력해주세요.';
  }

  if (!/^[a-zA-Z0-9`'~!@#$%^&*()-_=+]*$/.test(password)) {
    errors.password = '비밀번호는 영어, 숫자, 특수문자만 입력가능합니다.';
  }
  if (password.length < 8 || password.length > 20) {
    errors.password = '비밀번호는 8~20자 이내로 입력해주세요.';
  }

  return errors;
};

export {validateLogin};
