import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';

// TODO: Move types and mock data to Redux store.

interface Transaction {
  hash: string;
}

const transactions: Transaction[] = [];

const RecentTransactions = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Recent Transactions</Text>
        <TouchableOpacity>
          <Text>View all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        keyExtractor={transaction => transaction.hash}
        data={transactions}
        renderItem={({ item }) => <View>{item.hash}</View>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {}
});

export default RecentTransactions;
