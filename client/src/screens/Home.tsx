import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../types/navigation';

const Home = () => {
  const { navigate } = useNavigation<StackNavigationProp<AppStackParamList>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate('Contacts')}>
        <Text>Contacts</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('SendAmount')}>
        <Text>Send Amount</Text>
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
