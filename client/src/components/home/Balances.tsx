import React from 'react';
import { View, Text } from 'react-native';
import { useAppSelector } from '../../redux/store';
import { getBalance, tokenlist } from '../../utils/balances';

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
    <View>
      <Text>Balances</Text>
    </View>
  );
};

export default Balances;
