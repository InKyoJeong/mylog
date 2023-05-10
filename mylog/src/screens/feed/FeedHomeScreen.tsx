import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import FeedItemList from '@/components/feed/FeedItemList';

function FeedScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FeedItemList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedScreen;
