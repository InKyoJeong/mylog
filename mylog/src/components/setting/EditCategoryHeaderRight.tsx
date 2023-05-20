import React from 'react';

import HeaderButton from '../@common/HeaderButton';

function EditCategoryHeaderRight(onSubmit: () => void, hasError: boolean) {
  return (
    <HeaderButton labelText="저장" hasError={hasError} onPress={onSubmit} />
  );
}

export default EditCategoryHeaderRight;
