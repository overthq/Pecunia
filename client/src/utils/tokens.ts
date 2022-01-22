import tokenlist from '../data/tokenlist.json';

// Note this is neither performant nor good in any way.
// We should have a key-value tokenlist
// Something like:
// type Address = string;
//
// type TokenInfo = {
//	name: string;
//	symbol: string;
//	address: Address;
//	decimals: number;
// }
//
// type KVTokenList = Record<Address, TokenInfo>;

export const getTokenName = (address: string) => {
  for (const token of tokenlist) {
    if (token.address === address) {
      return { name: token.name, symbol: token.symbol };
    }
  }
};
