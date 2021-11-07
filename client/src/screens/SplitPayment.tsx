import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
	ListRenderItem
} from 'react-native';
import { getContacts, Contact } from '../utils/contacts';

export const SelectContacts = () => {
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = React.useState<Contact[]>([]);

	const handleSelectContact = React.useCallback((item: Contact) => {
		setSelectedContacts([...selectedContacts, item]);
	}, [selectedContacts]);
	
	const loadContacts = React.useCallback(async () => {
		setContacts(Object.values(await getContacts()));
	}, []);

	const renderItem: ListRenderItem<Contact> = React.useCallback(({ item }) => (
		<TouchableOpacity
			onPress={() => handleSelectContact(item)}
		>
			<Text>{item.name}</Text>
			<Text>{item.address}</Text>
		</TouchableOpacity>
	), []);

  React.useEffect(() => {
		loadContacts();
  }, []);

  return (
    <View>
      <FlatList
        keyExtractor={c => c.address}
        data={contacts}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const SplitPayment = () => {
  return (
    <View style={styles.container}>
      <Text>Create a new split payment</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default SplitPayment;
