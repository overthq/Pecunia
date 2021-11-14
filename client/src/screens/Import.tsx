import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Button from '../components/Button';

const Import: React.FC = () => {
  const [seed, setSeed] = React.useState('');

  const handleSubmit = React.useCallback(() => {
    // Do something
  }, [seed]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Import</Text>
      <Text style={styles.description}>
        You can import an existing wallet using its seed phrase or private key.
      </Text>
      <TextInput
        value={seed}
        onChangeText={setSeed}
        placeholder='Yor seed phrase (12 or 24 characters)'
        style={styles.input}
        multiline
        textAlignVertical='top'
      />
      <Button text='Import' onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 16,
    color: '#505050'
  },
  input: {
    fontSize: 16
  }
});

export default Import;
