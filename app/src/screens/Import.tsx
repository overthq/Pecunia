import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import ethers from 'ethers';

export const web3Provider = ethers.getDefaultProvider('homestead');

const Import = () => {
  const [loading, setLoading] = React.useState(false);
  const [seedPhrase, setSeedPhrase] = React.useState('');

  const handleSubmit = async () => {
    setLoading(true);
    const hdnode = ethers.utils.HDNode.fromMnemonic(seedPhrase);
    const node = hdnode.derivePath(`m/44'/60'/0'/0/0`);
    const wallet = new ethers.Wallet(node.privateKey);

    console.log(wallet);

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Import a wallet</Text>
      <Text style={styles.description}>
        Import your exisiting Ethereum wallet by entering your seed phrase or
        private key below:
      </Text>
      <TextInput
        placeholder='Enter your seed phrase here (12 or 24 words)'
        onChangeText={setSeedPhrase}
        multiline
        style={styles.textArea}
      />
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={loading || !seedPhrase}
        style={styles.importButton}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.importButtonText}>Import wallet</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  description: {
    fontSize: 16
  },
  textArea: {
    // padding: 10,
    fontSize: 16,
    height: 100,
    // borderColor: '#D3D3D3',
    // borderRadius: 4,
    // borderWidth: 2,
    marginVertical: 15
  },
  importButton: {
    height: 50,
    borderRadius: 25,
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
