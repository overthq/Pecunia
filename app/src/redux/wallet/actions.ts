import SecureStore from 'expo-secure-store';
import { AppThunk } from '../store';
import { ACCOUNTS_LOADING, Account } from './types';
import { Alert } from 'react-native';

export const loadAllAccounts = (): AppThunk => async dispatch => {
  dispatch({ type: ACCOUNTS_LOADING });

  try {
    const accounts = await SecureStore.getItemAsync('pecuniaAccounts');
    if (!accounts) throw new Error('No saved accounts.');
    return JSON.parse(accounts) as Account[];
  } catch (error) {
    // Use Sentry to log the error.
    Alert.alert(error.message);
  }
};

export const addAccount = (): AppThunk => async (dispatch, getState) => {
  dispatch({ type: ACCOUNTS_LOADING });

  try {
    const accounts = await SecureStore.getItemAsync('pecuniaAccounts');
    if (!accounts) {
      // Add the account
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};
