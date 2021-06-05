import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {} from '../utils/wallet';

const Settings = () => {
  return (
    <View style={styles.container}>
      <Text>Switch network</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Settings;
