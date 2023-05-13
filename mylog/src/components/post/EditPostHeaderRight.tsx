import React from 'react';

import HeaderButton from '../@common/HeaderButton';

function EditPostHeaderRight(onSubmit: () => void, hasError: boolean) {
  return (
    <HeaderButton labelText="등록" hasError={hasError} onPress={onSubmit} />
  );
}

export default EditPostHeaderRight;
