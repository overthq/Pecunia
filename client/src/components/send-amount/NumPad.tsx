import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const numbers = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['*', '0', 'x']
];

const NumPad = () => {
  const [text, setText] = React.useState('');

  const handlePress = (key: string) => {
    if (key === 'x') {
      setText(t => t.slice(0, -1));
    } else {
      setText(t => `${t}${key}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ height: 50, justifyContent: 'center' }}>
        <Text style={{ fontSize: 18, textAlign: 'center' }}>{text}</Text>
      </View>
      {numbers.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((num, j) => (
            <Pressable
              key={j}
              style={styles.key}
              onPress={() => handlePress(num)}
            >
              <Text style={styles.text}>{num}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    width: '100%',
    height: 45
  },
  key: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 18
  }
});

export default NumPad;
