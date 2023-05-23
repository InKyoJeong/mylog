import React from 'react';
import {Text} from 'react-native';
import {ScrollView, StyleSheet, View} from 'react-native';

import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants';
import type {CalendarPost} from '@/api';
import type {ThemeMode} from '@/types';

interface CalendarContentsListProps {
  posts: CalendarPost[];
}

function CalendarContentsList({posts}: CalendarContentsListProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        {posts?.map(post => (
          <View key={post.id} style={styles.itemContainer}>
            <View style={styles.itemHeader} />
            <View style={styles.infoContainer}>
              <Text
                style={styles.addressText}
                numberOfLines={1}
                ellipsizeMode="tail">
                {post.address}
              </Text>
              <Text style={styles.titleText}>{post.title}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors[theme].WHITE,
      padding: 20,
    },
    innerContainer: {
      gap: 20,
      marginBottom: 50,
    },
    itemContainer: {
      flexDirection: 'row',
    },
    itemHeader: {
      backgroundColor: colors[theme].PINK_700,
      width: 8,
      height: 50,
      marginRight: 8,
      borderRadius: 20,
    },
    infoContainer: {
      justifyContent: 'space-evenly',
    },
    addressText: {
      color: colors[theme].GRAY_500,
      fontSize: 13,
    },
    titleText: {
      color: colors[theme].BLACK,
      fontSize: 18,
      fontWeight: '600',
    },
  });

export default CalendarContentsList;
