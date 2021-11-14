import 'react-native-get-random-values';
import '@ethersproject/shims';
import { ethers, Wallet } from 'ethers';
import { TransactionRequest } from '@ethersproject/abstract-provider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_PATH = `m/44'/60'/0'/0`;
const useTestnet = false;

const networks = {
  optimism: {
    mainnet: 'https://mainnet.optimism.io',
    testnet: 'https://kovan.optimism.io'
  },
  arbitrum: {
    mainnet: '',
    testnet: 'https://kovan5.arbitrum.io/rpc'
  },
  polygon: {
    mainnet: '',
    testnet: 'https://rpc-mumbai.maticvigil.com'
  }
};

export let web3Provider = new ethers.providers.JsonRpcProvider(
  networks.optimism[useTestnet ? 'testnet' : 'mainnet']
);

export const setNetwork = (network: keyof typeof networks) => {
  web3Provider = new ethers.providers.JsonRpcProvider(
    networks[network][useTestnet ? 'testnet' : 'mainnet']
  );
};

export const hasPreviousTransactions = async (walletAddress: string) => {
  const transactionCount = await web3Provider.getTransactionCount(
    walletAddress
  );
  return transactionCount > 0;
};

export const importWallet = (privateKey: string) => {
  const wallet = new ethers.Wallet(privateKey);
  return wallet;
};

export const importWalletFromSeed = async (seedPhrase: string) => {
  const hdnode = ethers.utils.HDNode.fromMnemonic(seedPhrase);
  const node = hdnode.derivePath(`${DEFAULT_PATH}/0`);
  const wallet = importWallet(node.privateKey);
  return wallet;
};

const loadPrivateKey = async () => {
  const privateKey = await AsyncStorage.getItem('pecunia-wallet-address');

  if (!privateKey) throw new Error('Private key not stored.');

  return privateKey;
};

const loadWallet = async () => {
  const privateKey = await loadPrivateKey();

  return new Wallet(privateKey, web3Provider);
};

export const sendTransaction = async (request: TransactionRequest) => {
  const wallet = await loadWallet();

  wallet.sendTransaction(request);
};

export const createWallet = async () => {
  // Load seed phrase from bip39
};
