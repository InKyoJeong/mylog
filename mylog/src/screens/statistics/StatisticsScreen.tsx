import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';

interface StatisticsScreenProps {}

function StatisticsScreen({}: StatisticsScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={{fontSize: 20}}>프로필 수정</Text>
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
