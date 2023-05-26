import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {CompoundOption} from '../@common/CompoundOption';
import {colorHex} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import Conditional from '../@common/Conditional';

interface MarkerFilterOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

function MarkerFilterOption({isVisible, hideOption}: MarkerFilterOptionProps) {
  const {theme} = useThemeStore();
  const [filterCondition, setFilterCondition] = useState('색상');
  const [filterItems, setFilterItems] = useState<Record<string, boolean>>({
    '1': true,
    '2': true,
    '3': true,
    '4': true,
    '5': true,
    RED: true,
    YELLOW: true,
    GREEN: true,
    BLUE: true,
    PURPLE: true,
  });

  const handleCondition = (condition: string) => {
    setFilterCondition(condition);
  };

  const handleFilter = (name: string) => {
    setFilterItems({
      ...filterItems,
      [name]: !filterItems[name],
    });
  };

  return (
    <CompoundOption
      isVisible={isVisible}
      hideOption={hideOption}
      animationType="fade">
      <CompoundOption.Background>
        <CompoundOption.Container>
          <CompoundOption.Title>마커 필터링</CompoundOption.Title>
          <CompoundOption.Divider />
          <View style={styles.filterContainer}>
            <CompoundOption.Filter
              isSelected={filterCondition === '색상'}
              onPress={() => handleCondition('색상')}>
              색상
            </CompoundOption.Filter>
            <CompoundOption.Filter
              isSelected={filterCondition === '점수'}
              onPress={() => handleCondition('점수')}>
              점수
            </CompoundOption.Filter>
          </View>
          <CompoundOption.Divider />

          <Conditional condition={filterCondition === '색상'}>
            <CompoundOption.CheckBox
              isChecked={filterItems['RED']}
              icon={
                <View
                  style={[
                    styles.marker,
                    {backgroundColor: colorHex(theme)['RED']},
                  ]}
                />
              }
              onPress={() => handleFilter('RED')}>
              음식점
            </CompoundOption.CheckBox>
            <CompoundOption.CheckBox
              isChecked={filterItems['YELLOW']}
              icon={
                <View
                  style={[
                    styles.marker,
                    {backgroundColor: colorHex(theme)['YELLOW']},
                  ]}
                />
              }
              onPress={() => handleFilter('YELLOW')}>
              체크박스
            </CompoundOption.CheckBox>
            <CompoundOption.CheckBox
              isChecked={filterItems['GREEN']}
              icon={
                <View
                  style={[
                    styles.marker,
                    {backgroundColor: colorHex(theme)['GREEN']},
                  ]}
                />
              }
              onPress={() => handleFilter('GREEN')}>
              체크박스
            </CompoundOption.CheckBox>
            <CompoundOption.CheckBox
              isChecked={filterItems['BLUE']}
              icon={
                <View
                  style={[
                    styles.marker,
                    {backgroundColor: colorHex(theme)['BLUE']},
                  ]}
                />
              }
              onPress={() => handleFilter('BLUE')}>
              체크박스
            </CompoundOption.CheckBox>
            <CompoundOption.CheckBox
              isChecked={filterItems['PURPLE']}
              icon={
                <View
                  style={[
                    styles.marker,
                    {backgroundColor: colorHex(theme)['PURPLE']},
                  ]}
                />
              }
              onPress={() => handleFilter('PURPLE')}>
              체크박스
            </CompoundOption.CheckBox>
          </Conditional>

          <Conditional condition={filterCondition === '점수'}>
            <CompoundOption.CheckBox
              isChecked={filterItems['1']}
              onPress={() => handleFilter('1')}>
              1점
            </CompoundOption.CheckBox>
            <CompoundOption.CheckBox
              isChecked={filterItems['2']}
              onPress={() => handleFilter('2')}>
              2점
            </CompoundOption.CheckBox>
            <CompoundOption.CheckBox
              isChecked={filterItems['3']}
              onPress={() => handleFilter('3')}>
              3점
            </CompoundOption.CheckBox>
            <CompoundOption.CheckBox
              isChecked={filterItems['4']}
              onPress={() => handleFilter('4')}>
              4점
            </CompoundOption.CheckBox>
            <CompoundOption.CheckBox
              isChecked={filterItems['5']}
              onPress={() => handleFilter('5')}>
              5점
            </CompoundOption.CheckBox>
          </Conditional>
          <CompoundOption.Divider />
          <CompoundOption.Button onPress={() => {}}>완료</CompoundOption.Button>
        </CompoundOption.Container>
      </CompoundOption.Background>
    </CompoundOption>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-around',
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default MarkerFilterOption;
