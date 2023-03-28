import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  FeedNavigations,
  FeedStackParamList,
} from '@/navigations/stack/FeedStackNavigator';

type FeedScreenProps = NativeStackScreenProps<
  FeedStackParamList,
  FeedNavigations.LocationFeed
>;

function FeedScreen({navigation}: FeedScreenProps) {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text>Feed</Text>
          <Button
            title="Detail 페이지로 이동"
            onPress={() => navigation.navigate(FeedNavigations.LocationDetail)}
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
