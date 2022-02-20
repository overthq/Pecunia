import { Provider, Contract } from 'ethcall';
import { utils, BigNumber } from 'ethers';
import ERC20ABI from '../data/abis/ERC20.json';
import tokenlist from '../data/tokenlist.json';
import { web3Provider } from './wallet';

const ethcallProvider = new Provider();

export interface Balance {
  symbol: string;
  address: string;
  balance: string;
}

export const getBalances = async (walletAddress: string) => {
  await ethcallProvider.init(web3Provider as any);

  const calls = tokenlist.map(t => {
    const c = new Contract(t.address, ERC20ABI);
    return c.balanceOf(walletAddress);
  });

  const data = (await ethcallProvider.all(calls)) as BigNumber[];

  const balances = tokenlist.map((t, i) => ({
    symbol: t.symbol,
    address: t.address,
    balance: utils.formatUnits(data[i], t.decimals || 18)
  }));

  return balances;
};
