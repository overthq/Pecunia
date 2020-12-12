export const UPDATE_PREFERENCE = 'preferences/UPDATE_PREFERENCE';

export enum Network {
  Goerli = 'goerli',
  Kovan = 'kovan',
  Mainnet = 'mainnet',
  Rinkeby = 'rinkeby',
  Ropsten = 'ropsten'
}

export interface PreferencesState {
  network: Network;
  theme: 'light' | 'dark';
}

interface UpdatePreferenceAction {
  type: typeof UPDATE_PREFERENCE;
  payload: Partial<PreferencesState>;
}

export type PreferencesAction = UpdatePreferenceAction;
