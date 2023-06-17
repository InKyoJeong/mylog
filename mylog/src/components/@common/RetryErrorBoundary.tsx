import React, {PropsWithChildren} from 'react';
import {useQueryErrorResetBoundary} from '@tanstack/react-query';
import {ErrorBoundary} from 'react-error-boundary';

import RetryErrorFallback from './RetryErrorFallback';
import {captureException} from '@/utils';

const RetryErrorBoundary = ({children}: PropsWithChildren) => {
  const {reset} = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      onError={error => captureException(error)}
      FallbackComponent={RetryErrorFallback}>
      {children}
    </ErrorBoundary>
  );
};

export default RetryErrorBoundary;
