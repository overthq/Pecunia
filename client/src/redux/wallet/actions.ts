import { AppThunk } from '../store';
import { CLEAR_WALLET, LOAD_WALLET } from './types';

export const saveWalletDetails =
  (address: string): AppThunk =>
  dispatch => {
    dispatch({ type: LOAD_WALLET, payload: { address } });
  };

export const clearWallet = (): AppThunk => dispatch => {
  dispatch({ type: CLEAR_WALLET });
};
