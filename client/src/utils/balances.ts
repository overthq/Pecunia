import { Provider, Contract } from 'ethcall';
import { utils, BigNumber } from 'ethers';
import ERC20ABI from '../data/abis/ERC20.json';
import tokenlist from '../data/tokenlist.json';
import { web3Provider } from './wallet';

const ethcallProvider = new Provider();

export type BalancesType = Record<string, string>;

export const getBalances = async (walletAddress: string) => {
  await ethcallProvider.init(web3Provider);

  const calls = tokenlist.map(t => {
    const c = new Contract(t.address, ERC20ABI);
    return c.balanceOf(walletAddress);
  });

  const data = (await ethcallProvider.all(calls)) as BigNumber[];

  const balanceData: Record<string, string> = {};

  for (let i = 0; i < tokenlist.length; i++) {
    balanceData[tokenlist[i].address] = utils.formatUnits(
      data[i],
      tokenlist[i].decimals || 18
    );
  }

  return balanceData;
};
