import { Contract, utils } from 'ethers';
import ERC20ABI from '../data/abis/ERC20.json';
import { web3Provider } from './wallet';

export const getBalance = async (
  tokenAddress: string,
  walletAddress: string
) => {
  const tokenContract = new Contract(tokenAddress, ERC20ABI, web3Provider);
  const balance = await tokenContract.balanceOf(walletAddress);
  const decimals = await tokenContract.decimals();
  return utils.formatUnits(balance, decimals || 18);
};

export const getBalances = async () => {
  // Use multicall to get multiple balances in one call
};
