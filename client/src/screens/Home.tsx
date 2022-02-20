import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Balances from '../components/home/Balances';
import NewPaymentButton from '../components/home/NewPaymentButton';

const Home: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Balances />
      <NewPaymentButton />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Send money</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  button: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#000000',
    borderRadius: 100,
    width: 200
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF'
  }
});

export default Home;
