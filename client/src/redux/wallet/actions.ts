import { AppThunk } from '../store';
import { LOAD_WALLET } from './types';

export const saveWalletDetails =
  (address: string): AppThunk =>
  dispatch => {
    dispatch({ type: LOAD_WALLET, payload: { address } });
  };
