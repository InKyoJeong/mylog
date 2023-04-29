import {useState} from 'react';

function useDatePicker(initialDate: Date = new Date()) {
  const [date, setDate] = useState(initialDate);
  const [isVisible, setIsVisible] = useState(false);
  const [isPicked, setIsPicked] = useState(false);

  const showModal = () => {
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
  };

  const handleChange = (pickedDate: Date) => {
    setDate(pickedDate);
  };

  const handleConfirm = () => {
    hideModal();
    setIsPicked(true);
  };

  return {
    date,
    isVisible,
    isPicked,
    showModal,
    hideModal,
    onChange: handleChange,
    onConfirm: handleConfirm,
  };
}

export default useDatePicker;
