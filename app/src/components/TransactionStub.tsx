import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Transaction } from 'ethers';
import { toDate, formatDistance } from 'date-fns';

interface TransactionStubProps {
  transaction: Transaction;
}

enum TransactionStatus {
  Received = 'received',
  Sent = 'sent',
  Failed = 'failed'
}

const TransactionStub: React.FC<TransactionStubProps> = ({ transaction }) => {
  // TODO: Parse the correct definition of the "status" of the transaction
  // Is it stored in the "data" field of the transaction

  return (
    <View style={styles.container}>
      <Text>
        {formatDistance(Date.now(), toDate(transaction.timestamp * 1000))}
      </Text>
      <Text>{transaction.status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    // shadowRadius: 10
    shadowRadius: 4
  }
});

export default TransactionStub;
