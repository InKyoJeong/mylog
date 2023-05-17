import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {colors} from '@/constants/colors';
import FeedSearchItemList from '@/components/feed/FeedSearchItemList';

interface FeedSearchScreenProps {}

function FeedSearchScreen({}: FeedSearchScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <FeedSearchItemList />
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
