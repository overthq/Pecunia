import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, Action, combineReducers } from 'redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';

const rootReducer = combineReducers({
  wallet: persistReducer(
    { key: 'wallet', storage: AsyncStorage },
    (s = {}) => s
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
