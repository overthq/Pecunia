import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ListRenderItem
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '../redux/store';
import { Contact } from '../redux/contacts/types';

export const SelectContacts = () => {
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

const SplitPayment = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Create a new split payment</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default SplitPayment;
