import {ResponseError} from '@/types';
import * as Sentry from '@sentry/react-native';

function captureException(error: unknown) {
  if (__DEV__) {
    console.error(error);
    return;
  }

  Sentry.captureException(error);
}

function isServerError(error: ResponseError) {
  return Number(error.response?.status) >= 500;
}

export {captureException, isServerError};
