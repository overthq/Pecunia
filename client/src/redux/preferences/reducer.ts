import {
  PreferencesState,
  PreferencesActionTypes,
  UPDATE_PREFERENCE
} from './types';

const initialState: PreferencesState = {
  defaultCurrency: 'USDC',
  darkMode: false
};

const preferencesReducer = (
  state = initialState,
  action: PreferencesActionTypes
) => {
  switch (action.type) {
    case UPDATE_PREFERENCE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default preferencesReducer;
