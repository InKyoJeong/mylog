const getObjectWithValue = <T, K>(
  array: (keyof T)[],
  value: K,
): Record<keyof T, K> => {
  return array.reduce(
    (acc, cur) => ({...acc, [cur]: value}),
    {} as Record<keyof T, K>,
  );
};

export {getObjectWithValue};
