import {fireEvent} from '@testing-library/react-native';
import {ReactTestInstance} from 'react-test-renderer';

const delay = async (ms: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

const fillAndBlurInput = (element: ReactTestInstance, input: string) => {
  fireEvent.changeText(element, input);
  fireEvent(element, 'blur');
};

export {delay, fillAndBlurInput};
