export const FETCH_CONTACTS = 'contacts/FETCH_CONTACTS';
export const ADD_CONTACT = 'contacts/ADD_CONTACT';
export const REMOVE_CONTACT = 'contacts/REMOVE_CONTACT';
export const FAVORITE_CONTACT = 'contacts/FAVORITE_CONTACT';

export interface Contact {
  address: string; // TODO: ENS?
  name: string;
  favorite?: boolean;
}

export type ContactsState = Record<string, Contact>;

interface FetchContactsAction {
  type: typeof FETCH_CONTACTS;
}

interface AddContactAction {
  type: typeof ADD_CONTACT;
  payload: Contact;
}

interface RemoveContactAction {
  type: typeof REMOVE_CONTACT;
  payload: { address: string };
}
interface FavoriteContactAction {
  type: typeof FAVORITE_CONTACT;
  payload: { address: string };
}

export type ContactsAction =
  | FetchContactsAction
  | AddContactAction
  | RemoveContactAction
  | FavoriteContactAction;
