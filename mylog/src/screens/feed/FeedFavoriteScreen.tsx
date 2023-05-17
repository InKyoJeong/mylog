import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

import FeedItemFavoriteList from '@/components/feed/FeedItemFavoriteList';
import {colors} from '@/constants/colors';

function FeedFavoriteScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FeedItemFavoriteList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});
export default FeedFavoriteScreen;
