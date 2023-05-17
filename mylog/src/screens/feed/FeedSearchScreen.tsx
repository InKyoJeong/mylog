import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import FeedItemSearchList from '@/components/feed/FeedItemSearchList';
import {colors} from '@/constants/colors';

function FeedSearchScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FeedItemSearchList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default FeedSearchScreen;
