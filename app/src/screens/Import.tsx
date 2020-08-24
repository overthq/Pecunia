import React from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

import Button from '../components/Button';
import { importWalletFromSeedPhrase } from '../helpers/wallet';

const Import: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [seedPhrase, setSeedPhrase] = React.useState('');

  const handleSubmit = async () => {
    setLoading(true);

    // Check if input is private key or seed phrase.
    const wallet = importWalletFromSeedPhrase(seedPhrase);

    console.log(wallet);

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <Text style={styles.heading}>Import a wallet</Text>
      <TextInput
        placeholder='Enter your seed phrase or private key'
        onChangeText={setSeedPhrase}
        autoFocus
        multiline
        style={styles.textArea}
      />
      <Button
        loading={loading}
        disabled={!seedPhrase}
        onPress={handleSubmit}
        text='Import wallet'
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#FFFFFF'
  },
  heading: {
    fontSize: 36,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#505050'
  },
  textArea: {
    fontSize: 18,
    height: 100,
    marginVertical: 5
  }
});

export default Import;
