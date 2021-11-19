export interface PreferencesState {
  darkMode: boolean;
}

export const UPDATE_PREFERENCE = 'preferences/UPDATE_PREFERENCE';

interface UpdatePreferenceAction {
  type: typeof UPDATE_PREFERENCE;
  payload: Partial<PreferencesState>;
}

export type PreferencesActionTypes = UpdatePreferenceAction;
