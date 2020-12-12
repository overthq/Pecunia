import ethers from 'ethers';
import * as SecureStore from 'expo-secure-store';

const DEFAULT_PATH = `m/44'/60'/0'/0`;

export const web3Provider = ethers.getDefaultProvider('homestead');

export const hasPreviousTransactions = async (walletAddress: string) => {
  const transactionCount = await web3Provider.getTransactionCount(
    walletAddress
  );
  return transactionCount > 0;
};

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

export const loadTransactions = (walletAddress: string) => {
  const provider = new ethers.providers.EtherscanProvider();
  const history = provider.getHistory(walletAddress);
  console.log({ history });
};

export const loadWallet = async (walletAddress: string) => {
  const privateKey = await SecureStore.getItemAsync(
    `${walletAddress}-${keys.privateKey}`
  );
  console.log({ privateKey });
  if (!privateKey) throw new Error('Specified wallet is not saved.');
  return new ethers.Wallet(privateKey);
};

export const createWallet = async () => {
  const mnemonic = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(32));
  importWalletFromSeedPhrase(mnemonic);
};

export const nukeWalletDetails = async () => {
  await Promise.all(
    Object.keys(keys).map(async key => {
      await SecureStore.deleteItemAsync(key);
    })
  );
  console.log('Nuked all secure wallet details');
};
