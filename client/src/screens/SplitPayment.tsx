import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NumPad from '../components/send-amount/NumPad';

const SplitPayment: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Enter amount:</Text>
      <NumPad />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16
  }
});

export default SplitPayment;
