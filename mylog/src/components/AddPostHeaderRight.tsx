import React from 'react';

import HeaderButton from './common/HeaderButton';

function AddPostHeaderRight(onSubmit: () => void, hasError: boolean) {
  return (
    <HeaderButton labelText="등록" hasError={hasError} onPress={onSubmit} />
  );
}

export default AddPostHeaderRight;
