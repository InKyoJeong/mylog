import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import type {DrawerScreenProps} from '@react-navigation/drawer';
import type {CompositeScreenProps} from '@react-navigation/native';

import type {HomeStackParamList} from '@/navigations/stack/HomeStackNavigator';
import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {homeNavigations, mainNavigations} from '@/constants/navigations';
import useAuth from '@/hooks/queries/useAuth';

type HomeScreenProps = CompositeScreenProps<
  StackScreenProps<HomeStackParamList, typeof homeNavigations.MAP_HOME>,
  DrawerScreenProps<MainDrawerParamList, typeof mainNavigations.HOME>
>;

function HomeScreen({navigation}: HomeScreenProps) {
  const {logoutMutate} = useAuth();

  const handleLogout = () => {
    logoutMutate.mutate(null);
  };

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Text>Home</Text>
          <Button
            title="AddLocation 페이지로 이동"
            onPress={() => navigation.navigate(homeNavigations.ADD_LOCATION)}
          />
          <Button title="로그아웃" onPress={handleLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
