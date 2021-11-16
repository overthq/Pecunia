import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../types/navigation';
import { useAppSelector } from '../redux/store';
import Icon from '../components/Icon';
import { useDispatch } from 'react-redux';
import { clearWallet } from '../redux/wallet/actions';

const Home = () => {
  const { navigate } = useNavigation<StackNavigationProp<AppStackParamList>>();
  const walletAddress = useAppSelector(({ wallet }) => wallet.address);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Clear wallet address
    dispatch(clearWallet());
  }, []);

  return (
    <View style={styles.container}>
      {walletAddress && <Text>Wallet address: {walletAddress}</Text>}

      <Pressable onPress={() => navigate('New')}>
        <Icon name='plus' />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Home;
