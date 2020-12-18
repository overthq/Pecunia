import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Transaction, BigNumber } from 'ethers';
import { parseEther } from '@ethersproject/units';
import { toDate, formatDistance } from 'date-fns';
import {
  deriveTransactionStatus,
  openOnEtherscan,
  TransactionStatus
} from '../helpers/wallet';
import { useAppSelector } from '../redux/store';

interface TransactionStubProps {
  transaction: Transaction;
}

// Information to be parsed from the transaction:
// Related token and amount.
// Status of transaction: Sent, Received etc.
// Fiat value (with current ETH exchange rate)

const TransactionStub: React.FC<TransactionStubProps> = ({ transaction }) => {
  const primaryAccount = useAppSelector(({ wallet }) =>
    wallet.accounts.find(({ primary }) => primary === true)
  );
  const [transactionStatus, setTransactionStatus] = React.useState<
    TransactionStatus | undefined
  >();

  const address = primaryAccount?.address;
  if (!address) throw new Error('Impossible!');

  // TODO: Use the transaction receipts instead of the actual transaction information to build this component.
  // The primary reason for doing this is to avoid carrying out a potentially expensive asynchronous operation for all the transactions,
  // especially in the render phase.

  React.useEffect(() => {
    (async () => {
      if (transaction.hash) {
        const parsedStatus = await deriveTransactionStatus(
          transaction.hash,
          address
        );
        setTransactionStatus(parsedStatus);
      }
    })();
  }, []);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        if (transaction?.hash) openOnEtherscan(transaction.hash);
      }}
    >
      <Text>{transaction.value.toString()}ETH</Text>
      <Text>
        {formatDistance(Date.now(), toDate(transaction.timestamp * 1000))}
      </Text>
      <Text>{transactionStatus}</Text>
    </TouchableOpacity>
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
