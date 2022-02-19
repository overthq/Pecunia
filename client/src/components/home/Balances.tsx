import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../../redux/store';
import { BalancesType, getBalances } from '../../utils/balances';

const Balances: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const [balances, setBalances] = React.useState<BalancesType>({});
  const walletAddress = useAppSelector(({ wallet }) => wallet.address);

  const fetchData = React.useCallback(async () => {
    if (walletAddress) {
      const balanceData = await getBalances(walletAddress);

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
