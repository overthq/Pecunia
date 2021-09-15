import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ContactRow from '../components/contacts/ContactRow';
import { getContacts, Contact } from '../utils/contacts';

const Contacts = () => {
  const [contacts, setContacts] = React.useState<Record<string, Contact>>({});

  React.useEffect(() => {
    (async () => {
      const savedContacts = await getContacts();
      setContacts(savedContacts);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={c => c.address}
        data={Object.values(contacts)}
        renderItem={({ item }) => <ContactRow contact={item} />}
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
