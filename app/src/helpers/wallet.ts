import ethers from 'ethers';
import SecureStore from 'expo-secure-store';

const DEFAULT_PATH = `m/44'/60'/0'/0`;

export const web3Provider = ethers.getDefaultProvider('homestead');

export const importWalletFromSeedPhrase = async (seedPhrase: string) => {
  const hdnode = ethers.utils.HDNode.fromMnemonic(seedPhrase);
  const node = hdnode.derivePath(`${DEFAULT_PATH}/0`);
  const wallet = new ethers.Wallet(node.privateKey);

  // Save private key to the keychain, using the wallet address as the key.
  await SecureStore.setItemAsync(
    `${wallet.address}-private-key`,
    wallet.privateKey
  );

  // Save address to the keychain
  await SecureStore.setItemAsync('pecunia-wallet-address', wallet.address);

  const accounts = [];

  accounts.push({
    index: 0,
    name: 'Main Account',
    address: wallet.address,
    primary: true
  });

  for (let i = 1; i >= 1; i++) {
    const nextNode = hdnode.derivePath(`${DEFAULT_PATH}/${i}`);
    const nextWallet = new ethers.Wallet(nextNode.privateKey);

    // Save private key to keychain.
    await SecureStore.setItemAsync(
      `${nextWallet.address}-private-key`,
      nextWallet.privateKey
    );

    // Check if wallet has previous transactions using Etherscan API (imitate Rainbow's behaviour).
    if (hasPreviousTransactions(nextWallet.address)) {
      accounts.push({
        index: i,
        name: `Sub Account ${i}`,
        address: nextWallet.address,
        primary: false
      });
    } else {
      break;
    }
  }

  await SecureStore.setItemAsync('pecunia-accounts', JSON.stringify(accounts));

  return accounts;
};

export const importWalletFromPrivateKey = (privateKey: string) => {
  return new ethers.Wallet(privateKey);
};

export const createWallet = () => {
  // Generate mnemonic seed phrase
  // Derive private key (and address).
  // Save to keychain
};

const ETHERSCAN_API_KEY = '';

// Utility function borrowed from: https://github.com/rainbow-me/rainbow/blob/develop/src/utils/ethereumUtils.js
export const hasPreviousTransactions = async (walletAddress: string) => {
  try {
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&tag=latest&page=1&offset=1&apikey=${ETHERSCAN_API_KEY}`;
    const response = await fetch(url);
    const parsedResponse = await response.json();

    // Timeout needed to avoid the 5 requests / second rate limit of etherscan API

    setTimeout(() => {
      if (parsedResponse.status !== '0' && parsedResponse.result.length > 0) {
        return true;
      }

      return false;
    }, 260);
  } catch (e) {
    return false;
  }
};
