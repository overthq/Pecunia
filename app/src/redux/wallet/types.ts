import { Wallet } from 'ethers';

export const ADD_WALLET = 'wallet/ADD_WALLET';
export const REMOVE_WALLET = 'wallet/REMOVE_WALLET';

interface AddWalletAction {
  type: typeof ADD_WALLET;
  payload: {
    wallet: Wallet;
  };
}

interface RemoveWalletAction {
  type: typeof REMOVE_WALLET;
}

export type WalletAction = AddWalletAction | RemoveWalletAction;
