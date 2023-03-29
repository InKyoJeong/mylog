import {useEffect, useState} from 'react';

interface UseFormProps<T> {
  initialValue: T;
  validate: (values: T) => object;
}

function useForm<T>({initialValue, validate}: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const hasErrors = Object.values(errors).some(error => error);

  const handleChangeText = (name: keyof T, text: string) => {
    setValues({
      ...values,
      [name]: text,
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const getTextInputProps = (name: keyof T) => {
    const value = values[name];
    const onChangeText = (text: string) => handleChangeText(name, text);
    const onBlur = () => handleBlur(name);

    return {
      value,
      onChangeText,
      onBlur,
    };
  };

  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [validate, values]);

  return {values, getTextInputProps, hasErrors};
}

export default useForm;
