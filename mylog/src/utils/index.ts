import {ForwardedRef, MutableRefObject} from 'react';

function getObjectWithValue<T, K>(
  array: (keyof T)[],
  value: K,
): Record<keyof T, K> {
  return array.reduce(
    (acc, cur) => ({...acc, [cur]: value}),
    {} as Record<keyof T, K>,
  );
}

function mergeRefs<T>(...refs: (MutableRefObject<T> | ForwardedRef<T>)[]) {
  return (node: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    });
  };
}

export {getObjectWithValue, mergeRefs};
