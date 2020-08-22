import { Wallet } from 'ethers';
import { WalletAction, ADD_WALLET, REMOVE_WALLET } from './types';

interface WalletState {
  wallet?: Wallet;
}

const initialState: WalletState = {
  wallet: undefined
};

const walletReducer = (state = initialState, action: WalletAction) => {
  switch (action.type) {
    case ADD_WALLET:
      return { wallet: action.payload.wallet };
    case REMOVE_WALLET:
      return { wallet: undefined };
    default:
      return state;
  }
};

export default walletReducer;
