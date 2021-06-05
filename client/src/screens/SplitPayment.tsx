import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { getContacts, Contact } from '../utils/contacts';

export const SelectContacts = () => {
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = React.useState<Contact[]>([]);

  React.useEffect(() => {
    (async () => {
      setContacts(Object.values(await getContacts()));
    })();
  }, []);

  return (
    <View>
      <FlatList
        keyExtractor={c => c.address}
        data={contacts}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedContacts([...selectedContacts, item])}
          >
            <Text>{item.name}</Text>
            <Text>{item.address}</Text>
          </TouchableOpacity>
        )}
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
