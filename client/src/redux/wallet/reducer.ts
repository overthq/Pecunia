import { LOAD_WALLET, CLEAR_WALLET, WalletAction, WalletState } from './types';

const initialState: WalletState = {
  address: null
};

const walletReducer = (state = initialState, action: WalletAction) => {
  switch (action.type) {
    case LOAD_WALLET:
      return { address: action.payload.address };
    case CLEAR_WALLET:
      return initialState;
    default:
      return state;
  }
};

export default walletReducer;
