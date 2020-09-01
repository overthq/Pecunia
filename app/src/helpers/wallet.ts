import ethers from 'ethers';
import * as SecureStore from 'expo-secure-store';

const DEFAULT_PATH = `m/44'/60'/0'/0`;

export const web3Provider = ethers.getDefaultProvider('homestead');

// Keys for accessing SecureStore.
const keys = {
  walletAddress: 'pecunia-wallet-address',
  privateKey: 'private-key',
  accounts: 'pecunia-accounts'
};

export const importWalletFromSeedPhrase = async (seedPhrase: string) => {
  const hdnode = ethers.utils.HDNode.fromMnemonic(seedPhrase);
  const node = hdnode.derivePath(`${DEFAULT_PATH}/0`);
  const wallet = new ethers.Wallet(node.privateKey);

  // Save private key to the keychain, using the wallet address as the key.
  await SecureStore.setItemAsync(
    `${wallet.address}-${keys.privateKey}`,
    wallet.privateKey
  );

  // Save address to the keychain
  await SecureStore.setItemAsync(keys.walletAddress, wallet.address);

  const accounts = [];

  accounts.push({
    index: 0,
    name: 'Main Account',
    address: wallet.address,
    primary: true
  });

  let lookup = true;
  let nextIndex = 1;

  while (lookup) {
    const nextNode = hdnode.derivePath(`${DEFAULT_PATH}/${nextIndex}`);
    const nextWallet = new ethers.Wallet(nextNode.privateKey);

    // Save private key to keychain.
    await SecureStore.setItemAsync(
      `${nextWallet.address}-${keys.privateKey}`,
      nextWallet.privateKey
    );

    // Check if wallet has previous transactions using Etherscan API (imitate Rainbow's behaviour).
    if (await hasPreviousTransactions(nextWallet.address)) {
      accounts.push({
        index: nextIndex,
        name: `Sub Account ${nextIndex}`,
        address: nextWallet.address,
        primary: false
      });
      nextIndex++;
    } else {
      lookup = false;
    }
  }

  await SecureStore.setItemAsync(keys.accounts, JSON.stringify(accounts));
};

export const importWalletFromPrivateKey = (privateKey: string) => {
  return new ethers.Wallet(privateKey);
};

export const loadWallet = async (walletAddress: string) => {
  const privateKey = await SecureStore.getItemAsync(
    `${walletAddress}-${keys.privateKey}`
  );
  if (!privateKey) {
    throw new Error('Specified wallet is not saved.');
  }
  return new ethers.Wallet(privateKey);
};

export const createWallet = () => {
  // Generate mnemonic seed phrase
  // Derive private key (and address).
  // Save to keychain
  // TODO: Remember to install expo-random, to generate random bytes.
};

const ETHERSCAN_API_KEY = 'DIQGW4SCMNG3EPIV7X93DQEXWY83G5MVXJ';

// Utility function borrowed from: https://github.com/rainbow-me/rainbow/blob/develop/src/utils/ethereumUtils.js
export const hasPreviousTransactions = async (walletAddress: string) => {
  return new Promise(async resolve => {
    try {
      const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&tag=latest&page=1&offset=1&apikey=${ETHERSCAN_API_KEY}`;
      const response = await fetch(url);
      const parsedResponse = await response.json();
      // Timeout needed to avoid the 5 requests / second rate limit of etherscan API
      setTimeout(() => {
        if (parsedResponse.status !== '0' && parsedResponse.result.length > 0) {
          resolve(true);
        }
        resolve(false);
      }, 260);
    } catch (error) {
      resolve(false);
    }
  });
};
