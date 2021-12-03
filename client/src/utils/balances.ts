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
  // TODO: Check multiple balances at once.
  // Did some digging, found that Rainbow uses a custom "balance checker contract",
  // so they can do bulk checks (works for ETH and ERC20s).
  // See: https://github.com/rainbow-me/rainbow/blob/9e4feaa5054d18735e06e2d98ab72d3b783386d1/src/redux/fallbackExplorer.js#L262
};
