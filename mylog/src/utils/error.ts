import {ResponseError} from '@/types';

function isServerError(error: ResponseError) {
  return Number(error.response?.status) >= 500;
}

export {isServerError};
