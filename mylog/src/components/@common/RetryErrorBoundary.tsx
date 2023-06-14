import React, {PropsWithChildren} from 'react';
import {useQueryErrorResetBoundary} from '@tanstack/react-query';
import {ErrorBoundary} from 'react-error-boundary';

import RetryErrorFallback from './RetryErrorFallback';

const RetryErrorBoundary = ({children}: PropsWithChildren) => {
  const {reset} = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={RetryErrorFallback}>
      {children}
    </ErrorBoundary>
  );
};

export default RetryErrorBoundary;
