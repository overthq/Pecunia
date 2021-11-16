export const LOAD_WALLET_ACTION = 'wallet/LOAD_WALLET_ACTION';

export type WalletState = {
  address: string | null;
};

type LoadWalletAction = {
  type: typeof LOAD_WALLET_ACTION;
  payload: {
    address: string;
  };
};

export type WalletAction = LoadWalletAction;
