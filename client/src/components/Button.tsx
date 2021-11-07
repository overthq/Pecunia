import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface ButtonProps {
  text: string;
  onPress(): void;
}

const Button: React.FC<ButtonProps> = ({ text, onPress }) => (
  <Pressable style={styles.container} onPress={onPress}>
    <Text>{text}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: '100%',
    backgroundColor: '#000000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 17
  }
});

export default Button;
