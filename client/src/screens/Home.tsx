import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Balances from '../components/home/Balances';
import NewPaymentButton from '../components/home/NewPaymentButton';

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Balances />
      <NewPaymentButton />
    </SafeAreaView>
  );
};

export default Home;
