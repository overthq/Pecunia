import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Wallet } from '@ethersproject/wallet';
import Button from '../components/Button';
import { AppStackParamList } from '../types/navigation';
import { importWalletFromSeed } from '../utils/wallet';
import { useDispatch } from 'react-redux';
import { saveWalletDetails } from '../redux/wallet/actions';

const Onboarding: React.FC = () => {
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();
  const dispatch = useDispatch();

  const createWallet = async () => {
    const wallet = Wallet.createRandom();

    const w = await importWalletFromSeed(wallet.mnemonic.phrase);
    dispatch(saveWalletDetails(w.address));
  };

  const goToImport = () => {
    navigate('Import');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Onboarding</Text>
      <Button
        text='Create wallet'
        onPress={createWallet}
        style={{ marginBottom: 8 }}
      />
      <Button text='Import wallet' onPress={goToImport} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 16
  }
});

export default Onboarding;
