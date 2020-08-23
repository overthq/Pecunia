import ethers from 'ethers';
import SecureStore from 'expo-secure-store';

export const web3Provider = ethers.getDefaultProvider('homestead');

export const importWalletFromSeedPhrase = async (seedPhrase: string) => {
  const hdnode = ethers.utils.HDNode.fromMnemonic(seedPhrase);
  const node = hdnode.derivePath(`m/44'/60'/0'/0/0`);
  const wallet = new ethers.Wallet(node.privateKey);

  // Save private key to the keychain

  await SecureStore.setItemAsync('privateKey', wallet.privateKey);

  // Get previous transactions if they exist, and update the Redux store
  const hasPreviousTransactions = true;

  if (hasPreviousTransactions) {
  }
  return wallet;
};

export const importWalletFromPrivateKey = (privateKey: string) => {
  return new ethers.Wallet(privateKey);
};

export const createWallet = () => {
  // Generate mnemonic seed phrase
  // Derive private key (and address).
  // Save to keychain
};
