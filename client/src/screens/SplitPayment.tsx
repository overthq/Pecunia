import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import NumPad from '../components/send-amount/NumPad';
import Button from '../components/Button';

// Looks like there are multiple types of split payments.
// - Equal Splits.
// - Exact Amount (you can split the rest among remaining contacts in the group).
// - Percentage Splits.

const SplitPayment: React.FC = () => {
  const { bottom } = useSafeArea();

  const navigate = () => {
    // Something
  };

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <Text>Enter amount:</Text>
      <NumPad />
      <Button text='Select contacts' onPress={navigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16
  }
});

export default SplitPayment;
