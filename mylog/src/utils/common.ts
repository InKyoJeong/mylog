import type {ForwardedRef} from 'react';

function getObjectWithValue<T, K>(array: (keyof T)[], value: K) {
  return array.reduce(
    (acc, cur) => ({...acc, [cur]: value}),
    {} as Record<keyof T, K>,
  );
}

function mergeRefs<T>(...refs: ForwardedRef<T>[]) {
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

function convertMeterToKilometer(meter: number | string, decimal: number = 2) {
  const kilometer = Number(meter) / 1000;
  const factor = Math.pow(10, decimal);

  return Math.round(kilometer * factor) / factor;
}

export {getObjectWithValue, mergeRefs, convertMeterToKilometer};
