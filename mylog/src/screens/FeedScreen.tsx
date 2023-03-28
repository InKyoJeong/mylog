import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {DrawerScreenProps} from '@react-navigation/drawer';
import type {CompositeScreenProps} from '@react-navigation/native';

import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import type {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {feedNavigations, mainNavigations} from '@/constants';

type FeedScreenProps = CompositeScreenProps<
  NativeStackScreenProps<
    FeedStackParamList,
    typeof feedNavigations.LOCATION_FEED
  >,
  DrawerScreenProps<MainDrawerParamList, typeof mainNavigations.FEED>
>;

function FeedScreen({navigation}: FeedScreenProps) {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text>Feed</Text>
          <Button
            title="Detail 페이지로 이동"
            onPress={() => navigation.navigate(feedNavigations.LOCATION_DETAIL)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default FeedScreen;
