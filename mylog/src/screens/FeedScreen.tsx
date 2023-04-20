import React from 'react';
import {
  // Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// import type {StackScreenProps} from '@react-navigation/stack';
// import type {DrawerScreenProps} from '@react-navigation/drawer';
// import type {CompositeScreenProps} from '@react-navigation/native';

// import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
// import type {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
// import {feedNavigations, mainNavigations} from '@/constants/navigations';

// type FeedScreenProps = CompositeScreenProps<
//   StackScreenProps<FeedStackParamList, typeof feedNavigations.LOCATION_FEED>,
//   DrawerScreenProps<MainDrawerParamList, typeof mainNavigations.FEED>
// >;

function FeedScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text>Feed</Text>
          {/* <Button
            title="Detail 페이지로 이동"
            onPress={() => navigation.navigate(feedNavigations.LOCATION_DETAIL)}
          /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default FeedScreen;
