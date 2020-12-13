import * as SecureStore from 'expo-secure-store';
import { AppThunk } from '../store';
import {
  ACCOUNTS_LOADING,
  WalletAccount,
  ADD_ACCOUNT,
  LOAD_ACCOUNTS
} from './types';
import { Alert } from 'react-native';

export const loadAllAccounts = (): AppThunk => async dispatch => {
  dispatch({ type: ACCOUNTS_LOADING });

  try {
    const accounts = await SecureStore.getItemAsync('pecunia-accounts');
    if (!accounts) throw new Error('No saved accounts.');
    const parsedAccounts = JSON.parse(accounts) as WalletAccount[];
    dispatch({ type: LOAD_ACCOUNTS, payload: { accounts: parsedAccounts } });
  } catch (error) {
    // Use Sentry to log the error.
    Alert.alert(error.message);
  }
};

export const addAccount = (
  account: WalletAccount
): AppThunk => async dispatch => {
  dispatch({ type: ACCOUNTS_LOADING });

  try {
    const accounts = await SecureStore.getItemAsync('pecunia-accounts');
    if (!accounts) {
      // User has not set up application yet, and should probably be redirected to the import screen.
      throw new Error('You have not set up your wallet yet.');
    }
    dispatch({ type: ADD_ACCOUNT, payload: { account } });
  } catch (error) {
    Alert.alert(error.message);
  }
};
