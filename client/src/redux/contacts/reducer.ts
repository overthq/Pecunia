import {
  ADD_CONTACT,
  ContactsAction,
  ContactsState,
  FAVORITE_CONTACT,
  FETCH_CONTACTS,
  REMOVE_CONTACT
} from './types';

const initialState: ContactsState = {};

const contactsReducer = (state = initialState, action: ContactsAction) => {
  switch (action.type) {
    case FETCH_CONTACTS:
      return state;
    case ADD_CONTACT:
      return {
        ...state,
        [action.payload.address]: action.payload
      };
    case REMOVE_CONTACT:
      const copy = { ...state };
      delete copy[action.payload.address];
      return copy;
    case FAVORITE_CONTACT:
      return {
        ...state,
        [action.payload.address]: {
          ...state[action.payload.address],
          favorite: true
        }
      };
    default:
      return state;
  }
};

export default contactsReducer;
