import { NavigationProp, useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import Button from '../components/Button';
import ContactRow from '../components/contacts/ContactRow';
import { useAppSelector } from '../redux/store';
import { AppStackParamList } from '../types/navigation';
import { Contact } from '../redux/contacts/types';

const keyExtractor = (c: Contact) => c.address;

const renderContactRow: ListRenderItem<Contact> = ({ item }) => (
  <ContactRow contact={item} />
);

const Contacts = () => {
  const contacts = useAppSelector(({ contacts }) => contacts);
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();
  const contactsData = React.useMemo(() => Object.values(contacts), [contacts]);

  return (
    <View style={styles.container}>
      <Button text='Add Contact' onPress={() => navigate('AddContact')} />
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
