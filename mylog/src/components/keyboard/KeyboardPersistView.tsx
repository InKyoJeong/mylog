import React, {PropsWithChildren} from 'react';
import {ScrollView} from 'react-native';

function KeyboardPersistView({children}: PropsWithChildren) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
      keyboardDismissMode="on-drag">
      {children}
    </ScrollView>
  );
}

export default KeyboardPersistView;
