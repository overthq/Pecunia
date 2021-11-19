import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Contact } from '../../redux/contacts/types';
import { truncateAddress } from '../../utils/address';

interface ContactRowProps {
  contact: Contact;
}

const ContactRow: React.FC<ContactRowProps> = ({ contact }) => (
  <View style={styles.container}>
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{contact.name[0]}</Text>
    </View>
    <View>
      <Text style={styles.name}>{contact.name}</Text>
      <Text style={styles.address}>{truncateAddress(contact.address)}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#505050'
  },
  avatarText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500'
  },
  name: {
    fontSize: 16,
    fontWeight: '500'
  },
  address: {
    fontSize: 16,
    color: '#D3D3D3'
  }
});

export default ContactRow;
