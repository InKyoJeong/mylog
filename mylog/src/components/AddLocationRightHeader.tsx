import React from 'react';
import HeaderButton from './common/HeaderButton';

function AddLocationRightHeader(onSubmit: () => void, hasError: boolean) {
  return (
    <HeaderButton hasError={hasError} onPress={onSubmit} labelText="등록" />
  );
}

export default AddLocationRightHeader;
