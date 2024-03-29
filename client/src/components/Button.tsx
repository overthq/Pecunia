import React from 'react';
import {
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  ViewStyle
} from 'react-native';

interface ButtonProps {
  onPress(): void;
  text: string;
  loading?: boolean;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({ onPress, text, loading, style }) => (
  <Pressable style={[styles.container, style]} onPress={onPress}>
    {loading ? (
      <ActivityIndicator color='#FFFFFF' />
    ) : (
      <Text style={styles.text}>{text}</Text>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    height: 45,
    borderRadius: 4
  },
  text: {
    fontSize: 17,
    fontWeight: '500',
    color: '#FFFFFF'
  }
});

export default Button;
