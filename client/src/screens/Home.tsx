import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Balances from '../components/home/Balances';
import NewPaymentButton from '../components/home/NewPaymentButton';

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Balances />
      <NewPaymentButton />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Send money</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderRadius: 100,
    width: 200
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFF'
  }
});

export default Home;
