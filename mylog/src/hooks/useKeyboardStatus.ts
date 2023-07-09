import {useState, useEffect} from 'react';
import {Keyboard, KeyboardEvent} from 'react-native';

function useKeyboardStatus() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const onKeyboardWillShow = (e: KeyboardEvent) => {
    setKeyboardHeight(e.endCoordinates.height);
    setKeyboardVisible(true);
  };

  const onKeyboardWillHide = () => {
    setKeyboardHeight(0);
    setKeyboardVisible(false);
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

  return {keyboardVisible, keyboardHeight};
}

export default useKeyboardStatus;
