import { createStore, applyMiddleware, Action, combineReducers } from 'redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { persistStore } from 'redux-persist';

const rootReducer = combineReducers({
  // wallet: persistReducer({ key: 'wallet', storage: AsyncStorage }, walletReducer)
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
