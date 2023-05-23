import React from 'react';

import HeaderButton from '../@common/HeaderButton';

function CalendarHomeHeaderRight(onSubmit: () => void) {
  return <HeaderButton labelText="오늘" onPress={onSubmit} />;
}

export default CalendarHomeHeaderRight;
