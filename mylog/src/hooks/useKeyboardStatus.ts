import {useState, useEffect} from 'react';
import {Keyboard, KeyboardEvent} from 'react-native';

function useKeyboardStatus() {
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const onKeyboardWillShow = (e: KeyboardEvent) => {
    setKeyboardHeight(e.endCoordinates.height);
    setKeyboardStatus(true);
  };

  const onKeyboardWillHide = () => {
    setKeyboardHeight(0);
    setKeyboardStatus(false);
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardWillShow,
    );
    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardWillHide,
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return {keyboardStatus, keyboardHeight};
}

export default useKeyboardStatus;
