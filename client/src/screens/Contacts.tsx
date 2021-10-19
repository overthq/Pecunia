import React from 'react';
import { View, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import ContactRow from '../components/contacts/ContactRow';
import { getContacts, Contact } from '../utils/contacts';

const keyExtractor = (c: Contact) => c.address;

const renderContactRow: ListRenderItem<Contact> = ({ item }) => (
  <ContactRow contact={item} />
);

const Contacts = () => {
  const [contacts, setContacts] = React.useState<Record<string, Contact>>({});

  React.useEffect(() => {
    (async () => {
      const savedContacts = await getContacts();
      setContacts(savedContacts);
    })();
  }, []);

  const contactsData = React.useMemo(() => Object.values(contacts), [contacts]);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={keyExtractor}
        data={contactsData}
        renderItem={renderContactRow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Contacts;
