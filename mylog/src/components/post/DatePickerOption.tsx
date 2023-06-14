import React from 'react';
import {StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

import {CompoundOption} from '../@common/CompoundOption';
import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants';

interface DatePickerOptionProps {
  isVisible: boolean;
  date: Date;
  onChangeDate: (date: Date) => void;
  onConfirmDate: () => void;
}

function DatePickerOption({
  isVisible,
  date,
  onChangeDate,
  onConfirmDate,
}: DatePickerOptionProps) {
  const {theme} = useThemeStore();

  return (
    <CompoundOption isVisible={isVisible} hideOption={() => {}}>
      <CompoundOption.Background>
        <CompoundOption.Container>
          <View style={styles.pickerContainer}>
            <DatePicker
              mode="date"
              textColor={colors[theme].BLACK}
              date={date}
              onDateChange={onChangeDate}
              locale="ko"
            />
          </View>
        </CompoundOption.Container>
        <CompoundOption.Container>
          <CompoundOption.Button onPress={onConfirmDate}>
            선택완료
          </CompoundOption.Button>
        </CompoundOption.Container>
      </CompoundOption.Background>
    </CompoundOption>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    alignItems: 'center',
  },
});

export default DatePickerOption;
