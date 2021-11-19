import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import NewPaymentButton from '../components/home/NewPaymentButton';

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NewPaymentButton />
    </SafeAreaView>
  );
};

export default Home;
