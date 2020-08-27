export const ACCOUNTS_LOADING = 'wallet/ACCOUNTS_LOADING';
export const LOAD_ACCOUNTS = 'wallet/LOAD_ACCOUNTS';
export const ADD_ACCOUNT = 'wallet/ADD_ACCOUNT';
export const REMOVE_ACCOUNT = 'wallet/REMOVE_ACCOUNT';

enum AccountType {
  Current,
  Savings,
  Investment
}

interface Account {
  id: string;
  name: string;
  address: string;
  type: AccountType;
  index: number;
  primary?: boolean;
}

interface AccountsLoadingAction {
  type: typeof ACCOUNTS_LOADING;
}

interface LoadAccountsAction {
  type: typeof LOAD_ACCOUNTS;
  payload: {
    accounts: Account[];
  };
}

interface AddAccountAction {
  type: typeof ADD_ACCOUNT;
  payload: {
    account: Account;
  };
}

interface RemoveAccountAction {
  type: typeof REMOVE_ACCOUNT;
  payload: {
    accountId: string;
  };
}

export type WalletAction =
  | AccountsLoadingAction
  | LoadAccountsAction
  | AddAccountAction
  | RemoveAccountAction;
