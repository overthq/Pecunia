import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Transaction } from 'ethers';
import { parseEther } from '@ethersproject/units';
import { toDate, formatDistance } from 'date-fns';
import { deriveTransactionStatus, openOnEtherscan } from '../helpers/wallet';
import { useAppSelector } from '../redux/store';

interface TransactionStubProps {
  transaction: Transaction;
}

// https://www.jpwilliams.dev/how-to-unpack-the-return-type-of-a-promise-in-typescript
type AsyncReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => Promise<infer U>
  ? U
  : T extends (...args: any) => infer U
  ? U
  : any;

// const toWei = (ether: string) => parseEther(ether).toString();
// const toHex = value => BigNumber.from(value).toHexString();

const TransactionStub: React.FC<TransactionStubProps> = ({ transaction }) => {
  const primaryAccount = useAppSelector(({ wallet }) =>
    wallet.accounts.find(({ primary }) => primary === true)
  );
  const [transactionStatus, setTransactionStatus] = React.useState<
    AsyncReturnType<typeof deriveTransactionStatus> | undefined
  >();

  const address = primaryAccount?.address;

  React.useEffect(() => {
    (async () => {
      if (transaction.hash && address) {
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
      onPress={() => openOnEtherscan(transaction.hash)}
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
