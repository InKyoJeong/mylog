import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';

interface StatisticsScreenProps {}

function StatisticsScreen({}: StatisticsScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text>통계페이지</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default StatisticsScreen;
