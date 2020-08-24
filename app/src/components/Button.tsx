import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator
} from 'react-native';

interface ButtonProps {
  text: string;
  onPress(): void;
  loading?: boolean;
  disabled?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  loading,
  disabled,
  buttonStyle,
  textStyle
}) => {
  const disabledButtonStyle = { opacity: 0.7 };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.container,
        disabled ? disabledButtonStyle : {},
        buttonStyle
      ]}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={[styles.text, textStyle]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderRadius: 8,
    backgroundColor: '#000000'
  },
  text: {
    fontSize: 17,
    fontWeight: '500',
    color: '#FFFFFF'
  }
});

export default Button;
