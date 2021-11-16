import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import Button from '../components/Button';
import { saveWalletDetails } from '../redux/wallet/actions';
import { importWalletFromSeed } from '../utils/wallet';

const Import: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [seed, setSeed] = React.useState('');
  const dispatch = useDispatch();

  const handleSubmit = React.useCallback(async () => {
    setLoading(true);
    const wallet = await importWalletFromSeed(seed);
    dispatch(saveWalletDetails(wallet.address));
    setLoading(false);
  }, [seed]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Import</Text>
      <Text style={styles.description}>
        You can import an existing wallet using its seed phrase or private key.
      </Text>
      <TextInput
        value={seed}
        onChangeText={setSeed}
        placeholder='Your seed phrase (12 or 24 characters)'
        style={styles.textarea}
        multiline
        textAlignVertical='top'
      />
      <Button text='Import' onPress={handleSubmit} loading={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 8
  },
  description: {
    fontSize: 16,
    color: '#505050'
  },
  textarea: {
    fontSize: 16,
    height: 100,
    padding: 8,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#505050',
    marginVertical: 16
  }
});

export default Import;
