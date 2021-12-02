import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../../redux/store';
import { getBalance } from '../../utils/balances';
import tokenlist from '../../data/tokenlist.json';

const Balances = () => {
  const walletAddress = useAppSelector(({ wallet }) => wallet.address);

  const fetchData = React.useCallback(async () => {
    if (walletAddress) {
      const data = await Promise.all(
        tokenlist.map(async token => {
          return await getBalance(token.address, walletAddress);
        })
      );

      console.log(data);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Balances</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 8
  }
});

export default Balances;
