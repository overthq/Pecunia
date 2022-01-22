import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ListRenderItem
} from 'react-native';
import { useAppSelector } from '../redux/store';
import { Contact } from '../redux/contacts/types';

// TODO: Make a separate component for ContactsList.

const SelectContact = () => {
  const contacts = useAppSelector(({ contacts }) => contacts);
  const [selectedContacts, setSelectedContacts] = React.useState<Contact[]>([]);
  const contactsData = React.useMemo(() => Object.values(contacts), [contacts]);

  const handleSelectContact = React.useCallback(
    (item: Contact) => {
      setSelectedContacts([...selectedContacts, item]);
    },
    [selectedContacts]
  );

  const renderItem: ListRenderItem<Contact> = React.useCallback(
    ({ item }) => (
      <TouchableOpacity onPress={() => handleSelectContact(item)}>
        <Text>{item.name}</Text>
        <Text>{item.address}</Text>
      </TouchableOpacity>
    ),
    []
  );

  return (
    <View>
      <FlatList
        keyExtractor={c => c.address}
        data={contactsData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SelectContact;
