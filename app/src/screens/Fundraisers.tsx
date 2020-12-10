import React from 'react';
import { View, StyleSheet } from 'react-native';

// Getting a list of transactions is trivial, but filtering through all of them might be expensive.
// This is because of the deep conditions needed to pull this off.

const Fundraisers = () => {
  // Get a list of fundraisers created/deployed by this user from the blockchain.
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Fundraisers;
