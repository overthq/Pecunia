import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Send & Receive buttons and
// Recent transactions (activity)

const Home = () => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <TouchableOpacity onPress={() => navigate('Contacts')}>
        <Text>Contacts</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Home;
