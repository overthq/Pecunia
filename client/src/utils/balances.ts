import { Contract } from 'ethers';
import ERC20ABI from '../data/abis/ERC20.json';

export const tokenlist = [
  {
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 18,
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
  },
  {
    name: 'Dai Stablecoin',
    symbol: 'DAI',
    decimals: 18,
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F'
  }
];

export const getBalance = async (
  tokenAddress: string,
  walletAddress: string
) => {
  const tokenContract = new Contract(tokenAddress, ERC20ABI);
  return await tokenContract.functions.balanceOf(walletAddress);
};
