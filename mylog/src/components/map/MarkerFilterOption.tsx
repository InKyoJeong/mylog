import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {CompoundOption} from '../@common/CompoundOption';
import Conditional from '../@common/Conditional';
import useAuth from '@/hooks/queries/useAuth';
import useThemeStore from '@/store/useThemeStore';
import {categoryList, colorHex, scoreList} from '@/constants';
import {getObjectWithValue} from '@/utils';

interface MarkerFilterOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

function MarkerFilterOption({isVisible, hideOption}: MarkerFilterOptionProps) {
  const {theme} = useThemeStore();
  const {getProfileQuery} = useAuth();
  const {categories} = getProfileQuery.data || {};
  const [filterCondition, setFilterCondition] = useState('색상');
  const [filterItems, setFilterItems] = useState<Record<string, boolean>>({
    ...getObjectWithValue(categoryList, true),
    ...getObjectWithValue(scoreList, true),
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
            {['색상', '점수'].map(condition => (
              <CompoundOption.Filter
                key={condition}
                isSelected={filterCondition === condition}
                onPress={() => handleCondition(condition)}>
                {condition}
              </CompoundOption.Filter>
            ))}
          </View>
          <CompoundOption.Divider />

          <Conditional condition={filterCondition === '색상'}>
            {categoryList.map(color => (
              <CompoundOption.CheckBox
                key={color}
                isChecked={filterItems[color]}
                onPress={() => handleFilter(color)}
                icon={
                  <View
                    style={[
                      styles.marker,
                      {backgroundColor: colorHex(theme)[color]},
                    ]}
                  />
                }>
                {categories?.[color]}
              </CompoundOption.CheckBox>
            ))}
          </Conditional>

          <Conditional condition={filterCondition === '점수'}>
            {scoreList.map(score => (
              <CompoundOption.CheckBox
                key={score}
                isChecked={filterItems[score]}
                onPress={() => handleFilter(score)}>
                1점
              </CompoundOption.CheckBox>
            ))}
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
