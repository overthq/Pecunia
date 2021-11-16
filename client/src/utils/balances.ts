// Sample list of supported tokens and their addresses.
import { Contract } from 'ethers';
import ERC20Abi from '../data/abis/ERC20.json';

export const tokenlist = [
  {
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 18,
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
  }
];

export const getBalance = (tokenAddress: string, walletAddress: string) => {
  const tokenContract = new Contract(tokenAddress, ERC20Abi);
  return tokenContract.functions.balanceOf(walletAddress);
};
