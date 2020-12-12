import { AppThunk } from '../store';
import { loadTransactions } from '../../helpers/wallet';
import { LOAD_TRANSACTIONS_SUCCESS } from './types';

export const load = (): AppThunk => async (dispatch, getState) => {
  const { wallet } = getState();
  const { address } = wallet.accounts[0];
  const transactions = await loadTransactions(address);

  dispatch({
    type: LOAD_TRANSACTIONS_SUCCESS,
    payload: { transactions }
  });
};
