import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon, { IconType } from '../Icon';

type Key = '' | number | IconType;

const numbers: Key[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  ['', 0, 'backspace']
];

const NumPad = () => {
  const [text, setText] = React.useState('');

  const handlePress = (key: Key) => {
    if (key === 'backspace') {
      setText(t => t.slice(0, -1));
    } else {
      setText(t => `${t}${key}`);
    }
  };

  const handleLongPress = (key: Key) => {
    if (key === 'backspace') {
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Text style={styles.barText}>{text}</Text>
      </View>
      {numbers.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((key, j) => (
            <Pressable
              key={j}
              style={styles.key}
              onPress={() => handlePress(key)}
              onLongPress={() => handleLongPress(key)}
            >
              {key === 'backspace' ? (
                <Icon name='backspace' />
              ) : (
                <Text style={styles.text}>{key}</Text>
              )}
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
  bar: {
    height: 50,
    justifyContent: 'center'
  },
  barText: {
    fontSize: 24,
    textAlign: 'center'
  },
  key: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    fontWeight: '500'
  }
});

export default NumPad;
