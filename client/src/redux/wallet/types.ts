export const LOAD_WALLET = 'wallet/LOAD_WALLET';
export const CLEAR_WALLET = 'wallet/CLEAR_WALLET';

// Initially, this wallet will only support one wallet address at a time.
export type WalletState = {
  address: string | null;
};

type LoadWalletAction = {
  type: typeof LOAD_WALLET;
  payload: {
    address: string;
  };
};

type ClearWalletAction = {
  type: typeof CLEAR_WALLET;
};

export type WalletAction = LoadWalletAction | ClearWalletAction;
