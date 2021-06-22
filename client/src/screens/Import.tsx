import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Import: React.FC = () => {
  const [seed, setSeed] = React.useState('');

  return (
    <View style={styles.container}>
      <Text>Import an existing wallet using seed phrase</Text>
      <TextInput
        value={seed}
        onChangeText={setSeed}
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
