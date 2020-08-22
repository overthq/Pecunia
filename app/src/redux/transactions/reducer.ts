import {
  TransactionsState,
  TransactionsAction,
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_FAILURE
} from './types';

const initialState: TransactionsState = {
  loading: false,
  transactions: [],
  errorMessage: ''
};

const transactionsReducer = (
  state = initialState,
  action: TransactionsAction
) => {
  switch (action.type) {
    case LOAD_TRANSACTIONS:
      return { ...state, loading: true };
    case LOAD_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        transactions: action.payload.transactions
      };
    case LOAD_TRANSACTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.errorMessage
      };
    default:
      return state;
  }
};

export default transactionsReducer;
