import React from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {feedNavigations} from '@/constants';

type FeedScreenProps = NativeStackScreenProps<
  FeedStackParamList,
  typeof feedNavigations.LOCATION_FEED
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
