import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Move this logic to redux and switch to react-native-mmkv

export interface Contact {
  address: string; // address or ENS?
  name: string;
  favorite?: boolean;
}

export const getContacts = async (): Promise<Record<string, Contact>> => {
  const contacts = await AsyncStorage.getItem('contacts');
  if (!contacts) {
    await AsyncStorage.setItem('contacts', '{}');
    return {};
  }
  return JSON.parse(contacts);
};

export const addContact = async (contact: Contact) => {
  const contacts = await getContacts();
  await AsyncStorage.setItem(
    'contacts',
    JSON.stringify({
      ...contacts,
      [contact.address]: contact
    })
  );
};

export const removeContact = async (address: string) => {
  const contacts = await getContacts();
  const contactsCopy = { ...contacts };
  delete contactsCopy[address];
  await AsyncStorage.setItem('contacts', JSON.stringify(contactsCopy));
};

export const favoriteContact = async (address: string) => {
  const contacts = await getContacts();
  await AsyncStorage.setItem(
    'contacts',
    JSON.stringify({
      ...contacts,
      [address]: {
        ...contacts[address],
        favorite: true
      }
    })
  );
};
