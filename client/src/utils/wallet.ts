// INFORMATION:
// This "wallet" is intended as an experiment, to work only with L2 protocols like Polygon, Optimism, Loopring etc.
import ethers from 'ethers';

const DEFAULT_PATH = `m/44'/60'/0'/0`;

const web3Provider = new ethers.providers.JsonRpcProvider(
  'https://rpc-mumbai.maticvigil.com'
);

export const hasPreviousTransactions = async (walletAddress: string) => {
  const transactionCount = await web3Provider.getTransactionCount(
    walletAddress
  );
  return transactionCount > 0;
};

export const importWallet = async (privateKey: string) => {};

export const importWalletFromSeed = async (seedPhrase: string) => {
  const hdnode = ethers.utils.HDNode.fromMnemonic(seedPhrase);
  const node = hdnode.derivePath(`${DEFAULT_PATH}/0`);
  const wallet = new ethers.Wallet(node.privateKey);
  return wallet;
};
