import { AppThunk } from '../store';
import {
  Contact,
  ADD_CONTACT,
  REMOVE_CONTACT,
  FAVORITE_CONTACT
} from './types';

export const addContact =
  (contact: Contact): AppThunk =>
  dispatch => {
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

export const removeContact =
  (address: string): AppThunk =>
  dispatch => {
    dispatch({ type: REMOVE_CONTACT, payload: { address } });
  };

export const favoriteContact =
  (address: string): AppThunk =>
  dispatch => {
    dispatch({ type: FAVORITE_CONTACT, payload: { address } });
  };
