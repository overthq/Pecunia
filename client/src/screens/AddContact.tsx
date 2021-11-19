import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import Button from '../components/Button';
import { addContact } from '../redux/contacts/actions';

const AddContact = () => {
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  const handleSubmit = async () => {
    dispatch(addContact({ address, name }));
    goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        placeholder='Name'
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        value={address}
        placeholder='ETH Address'
        onChangeText={setAddress}
      />
      <Button text='Add Contact' onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#505050',
    borderRadius: 4,
    marginTop: 8,
    marginHorizontal: 8,
    paddingLeft: 16
  }
});

export default AddContact;
