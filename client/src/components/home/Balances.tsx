import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../../redux/store';
import { getBalance } from '../../utils/balances';
import tokenlist from '../../data/tokenlist.json';

type Balances = Record<string, string>;

const Balances = () => {
  const [loading, setLoading] = React.useState(true);
  const [balances, setBalances] = React.useState<Balances>({});
  const walletAddress = useAppSelector(({ wallet }) => wallet.address);

  const fetchData = React.useCallback(async () => {
    if (walletAddress) {
      const balanceData: Balances = {};

      for (const token of tokenlist) {
        // TODO: Use a batch call for this
        balanceData[token.address] = await getBalance(
          token.address,
          walletAddress
        );
      }

      setBalances(balanceData);
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Balances</Text>
      <Text>{loading ? 'Loading...' : JSON.stringify(balances)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 8
  }
});

export default Balances;
