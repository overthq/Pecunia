import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const numbers = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['-', '0', '-']
];

const NumPad = () => {
  return (
    <View>
      {numbers.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((num, j) => (
            <TouchableOpacity key={j}>
              <Text style={styles.text}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center'
  },
  text: {
    fontSize: 18
  }
});

export default NumPad;
