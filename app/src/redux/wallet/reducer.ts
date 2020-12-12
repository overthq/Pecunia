import {
  WalletAction,
  WalletAccount,
  ACCOUNTS_LOADING,
  ADD_ACCOUNT,
  REMOVE_ACCOUNT,
  LOAD_ACCOUNTS
} from './types';

interface WalletState {
  loading: boolean;
  accounts: WalletAccount[];
  errorMessage?: string;
}

const initialState: WalletState = {
  loading: false,
  accounts: []
};

// NOTE: The omission of an error state is not an oversight.
// Errors will be caught and logged using Sentry,
// but there is no incentive in storing it in a globally persisted store.

const walletReducer = (state = initialState, action: WalletAction) => {
  switch (action.type) {
    case ACCOUNTS_LOADING:
      return { ...state, loading: true };
    case LOAD_ACCOUNTS:
      return {
        ...state,
        loading: false,
        accounts: action.payload.accounts
      };
    case ADD_ACCOUNT:
      return {
        ...state,
        loading: false,
        accounts: [...state.accounts, action.payload.account]
      };
    case REMOVE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter(
          account => account.id !== action.payload.accountId
        )
      };
    default:
      return state;
  }
};

export default walletReducer;
