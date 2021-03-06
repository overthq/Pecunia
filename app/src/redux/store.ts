import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, applyMiddleware, Action, combineReducers } from 'redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';

import walletReducer from './wallet/reducer';
import transactionsReducer from './transactions/reducer';
import preferencesReducer from './preferences/reducer';

const rootReducer = combineReducers({
  wallet: persistReducer(
    { key: 'wallet', storage: AsyncStorage },
    walletReducer
  ),
  transactions: persistReducer(
    { key: 'transactions', storage: AsyncStorage },
    transactionsReducer
  ),
  preferences: persistReducer(
    { key: 'preferences', storage: AsyncStorage },
    preferencesReducer
  )
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  null,
  Action<string>
>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const middleware = applyMiddleware(thunk);
export const store = createStore(rootReducer, middleware);
export const persistor = persistStore(store);
