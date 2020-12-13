import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Transaction } from 'ethers';

interface TransactionStubProps {
  transaction: Transaction;
}

const TransactionStub: React.FC<TransactionStubProps> = ({ transaction }) => (
  <View style={styles.container}>
    <Text>{transaction.hash}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10
  }
});

export default TransactionStub;
