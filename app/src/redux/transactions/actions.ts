import { AppThunk } from '../store';
import { loadTransactions } from '../../helpers/wallet';
import { LOAD_TRANSACTIONS_SUCCESS } from './types';

export const load = (): AppThunk => dispatch => {
  const address = '';
  const transactions = loadTransactions(address);
  dispatch({
    type: LOAD_TRANSACTIONS_SUCCESS,
    payload: { transactions }
  });
};
