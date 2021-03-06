import { Transaction } from 'ethers';

export const LOAD_TRANSACTIONS = 'transactions/LOAD_TRANSACTIONS';
export const LOAD_TRANSACTIONS_SUCCESS =
  'transactions/LOAD_TRANSACTIONS_SUCCESS';
export const LOAD_TRANSACTIONS_FAILURE =
  'transactions/LOAD_TRANSACTIONS_FAILURE';

export interface TransactionsState {
  loading: boolean;
  transactions: Transaction[];
  errorMessage?: string;
}

interface LoadTransactionsAction {
  type: typeof LOAD_TRANSACTIONS;
}

interface LoadTransactionsSuccessAction {
  type: typeof LOAD_TRANSACTIONS_SUCCESS;
  payload: { transactions: Transaction[] };
}

interface LoadTransactionsFailureAction {
  type: typeof LOAD_TRANSACTIONS_FAILURE;
  payload: { errorMessage: string };
}

export type TransactionsAction =
  | LoadTransactionsAction
  | LoadTransactionsSuccessAction
  | LoadTransactionsFailureAction;
