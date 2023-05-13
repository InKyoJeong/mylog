import React from 'react';

import HeaderButton from '../@common/HeaderButton';

function EditPostHeaderRight(onSubmit: () => void, hasError: boolean) {
  return (
    <HeaderButton labelText="완료" hasError={hasError} onPress={onSubmit} />
  );
}

export default EditPostHeaderRight;
