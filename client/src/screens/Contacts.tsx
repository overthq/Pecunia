import { NavigationProp, useNavigation } from '@react-navigation/core';
import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  Pressable,
  Text
} from 'react-native';
import ContactRow from '../components/contacts/ContactRow';
import { AppStackParamList } from '../types/navigation';
import { getContacts, Contact } from '../utils/contacts';

const keyExtractor = (c: Contact) => c.address;

const renderContactRow: ListRenderItem<Contact> = ({ item }) => (
  <ContactRow contact={item} />
);

const Contacts = () => {
  const [contacts, setContacts] = React.useState<Record<string, Contact>>({});
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  React.useEffect(() => {
    (async () => {
      const savedContacts = await getContacts();
      setContacts(savedContacts);
    })();
  }, []);

  const contactsData = React.useMemo(() => Object.values(contacts), [contacts]);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigate('AddContact')}>
        <Text>Add Contact</Text>
      </Pressable>
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
