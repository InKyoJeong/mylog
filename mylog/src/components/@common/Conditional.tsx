import React, {PropsWithChildren} from 'react';

interface ConditionalProps {
  condition: boolean;
}

function Conditional({
  children,
  condition,
}: PropsWithChildren<ConditionalProps>) {
  return <>{condition && children}</>;
}

export default Conditional;
