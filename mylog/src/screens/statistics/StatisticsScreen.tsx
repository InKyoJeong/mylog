import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

interface StatisticsScreenProps {}

function StatisticsScreen({}: StatisticsScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text>통계페이지</Text>
        </View>
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
