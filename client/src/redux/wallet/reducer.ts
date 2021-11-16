import { LOAD_WALLET_ACTION, WalletAction, WalletState } from './types';

const initialState: WalletState = {
  address: null
};

const walletReducer = (state = initialState, action: WalletAction) => {
  switch (action.type) {
    case LOAD_WALLET_ACTION:
      return { address: action.payload.address };
    default:
      return state;
  }
};

export default walletReducer;
