import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const AddContact = () => {
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');

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
