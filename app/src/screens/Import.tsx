import React from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
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
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={loading || !seedPhrase}
        style={[styles.importButton, !seedPhrase ? { opacity: 0.7 } : {}]}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.importButtonText}>Import wallet</Text>
        )}
      </TouchableOpacity>
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
  },
  importButton: {
    height: 50,
    borderRadius: 8,
    marginHorizontal: 20,
    width: '100%',
    backgroundColor: '#191919',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  importButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF'
  }
});

export default Import;
