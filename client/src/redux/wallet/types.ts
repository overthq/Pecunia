export const LOAD_WALLET = 'wallet/LOAD_WALLET';

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

export type WalletAction = LoadWalletAction;
