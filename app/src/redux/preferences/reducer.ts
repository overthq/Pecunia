import {
  UPDATE_PREFERENCE,
  Network,
  PreferencesState,
  PreferencesAction
} from './types';

const initialState: PreferencesState = {
  network: Network.Mainnet,
  theme: 'light'
};

const preferencesReducer = (
  state = initialState,
  action: PreferencesAction
) => {
  switch (action.type) {
    case UPDATE_PREFERENCE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default preferencesReducer;
