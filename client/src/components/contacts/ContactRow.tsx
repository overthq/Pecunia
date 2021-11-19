import React from 'react';
import { View, Text } from 'react-native';
import { Contact } from '../../redux/contacts/types';

interface ContactRowProps {
  contact: Contact;
}

const ContactRow: React.FC<ContactRowProps> = ({ contact }) => {
  return (
    <View>
      <View>
        <Text>{contact.name[0]}</Text>
      </View>
      <View>
        <Text>{contact.name}</Text>
        <Text>{contact.address}</Text>
      </View>
    </View>
  );
};

export default ContactRow;
