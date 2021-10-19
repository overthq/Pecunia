import React from 'react';
import { View, StyleSheet } from 'react-native';
import NumPad from '../components/send-amount/NumPad';

const SendAmount = () => {
  return (
    <View style={styles.container}>
      <NumPad />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default SendAmount;
