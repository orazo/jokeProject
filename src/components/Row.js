import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Row = props => {
  const {title, rowKey} = props;
  return (
    <View key={rowKey} style={styles.container}>
      <View style={styles.separator} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {alignSelf: 'center', fontSize: 15, textAlign: 'center'},
  separator: {height: 1, width: '100%', backgroundColor: 'grey', margin: 10},
});
export default Row;
