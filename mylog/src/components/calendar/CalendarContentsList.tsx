import {CalendarPost} from '@/api';
import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import React from 'react';
import {Text} from 'react-native';
import {ScrollView, StyleSheet, View} from 'react-native';

interface CalendarDetailListProps {
  posts: CalendarPost[];
}

function CalendarDetailList({posts}: CalendarDetailListProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <ScrollView style={styles.container}>
      {posts?.map(post => (
        <View key={post.id}>
          <Text style={styles.text}>{post.title}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors[theme].WHITE,
    },
    text: {
      color: colors[theme].BLACK,
    },
  });

export default CalendarDetailList;
