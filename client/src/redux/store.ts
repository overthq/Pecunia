import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { createStore, applyMiddleware, combineReducers, Action } from 'redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import thunk, { ThunkAction } from 'redux-thunk';

import walletReducer from './wallet/reducer';
import preferencesReducer from './preferences/reducer';

const rootReducer = combineReducers({
  wallet: persistReducer(
    { key: 'wallet', storage: AsyncStorage },
    walletReducer
  ),
  preferences: persistReducer(
    { key: 'preferences', storage: AsyncStorage },
    preferencesReducer
  )
});

const middleware = applyMiddleware(thunk);

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  null,
  Action<string>
>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const store = createStore(rootReducer, middleware);
export const persistor = persistStore(store);
