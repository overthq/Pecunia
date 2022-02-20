import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../../redux/store';
import { Balance, getBalances } from '../../utils/balances';

const Balances: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const [balances, setBalances] = React.useState<Balance[]>([]);
  const [balance, setBalance] = React.useState<Balance>();
  const { walletAddress, defaultCurrency } = useAppSelector(
    ({ wallet, preferences }) => ({
      walletAddress: wallet.address,
      defaultCurrency: preferences.defaultCurrency
    })
  );

  const fetchData = React.useCallback(async () => {
    if (walletAddress) {
      const data = await getBalances(walletAddress);

      setBalance(data.find(({ symbol }) => symbol === defaultCurrency));

      setBalances(data);
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Balances</Text>
      {loading
        ? 'Loading...'
        : balances.map(b => (
            <Text key={b.address}>
              {b.symbol}: {b.balance}
            </Text>
          ))}
      <Text>
        Default currency balance: {balance?.symbol}: {balance?.balance}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 8
  }
});

export default Balances;
