import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../../types/navigation';
import Icon from '../Icon';

const NewPaymentButton = () => {
  const { navigate } = useNavigation<StackNavigationProp<AppStackParamList>>();

  return (
    <Pressable style={styles.button} onPress={() => navigate('New')}>
      <Icon size={18} color='#FFFFFF' style={{ marginRight: 4 }} name='plus' />
      <Text style={styles.buttonText}>New payment</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 24,
    backgroundColor: '#000000',
    paddingLeft: 12,
    paddingRight: 16,
    borderRadius: 20
  },
  buttonText: {
    color: '#FFFFFF'
  }
});

export default NewPaymentButton;
