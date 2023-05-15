import {useState} from 'react';

import useModal from './useModal';

function useDatePicker(initialDate: Date = new Date()) {
  const [date, setDate] = useState(initialDate);
  const [isPicked, setIsPicked] = useState(false);
  const datePickerModal = useModal();

  const handleChange = (pickedDate: Date) => {
    setDate(pickedDate);
  };

  const handleConfirm = () => {
    setIsPicked(true);
    datePickerModal.hide();
  };

  return {
    date,
    isPicked,
    handleChange,
    handleConfirm,
    isVisible: datePickerModal.isVisible,
    showModal: datePickerModal.show,
    hideModal: datePickerModal.hide,
  };
}

export default useDatePicker;
