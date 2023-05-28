import React, {PropsWithChildren} from 'react';

import {ErrorFallbackProps} from './ErrorFallback';

type RenderFallbackType = (props: ErrorFallbackProps) => JSX.Element;

interface Props {
  fallback: RenderFallbackType;
}

interface State {
  hasError: boolean;
}

const initialState = {
  hasError: false,
};

class ErrorBoundary extends React.Component<PropsWithChildren<Props>, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  resetErrorBoundary = () => {
    this.setState(initialState);
  };

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  render() {
    const {fallback: FallbackComponent, children} = this.props;

    if (this.state.hasError) {
      return <FallbackComponent reset={this.resetErrorBoundary} />;
    }

    return children;
  }
}

export default ErrorBoundary;
