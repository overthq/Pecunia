import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const Import: React.FC = () => {
  const [seedPhrase, setSeedPhrase] = React.useState('');

  return (
    <View style={styles.container}>
      <TextInput
        value={seedPhrase}
        onChangeText={setSeedPhrase}
        placeholder='Yor seed phrase (12 or 24 characters)'
        style={styles.input}
        multiline
        textAlignVertical='top'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    fontSize: 16
  }
});

export default Import;
