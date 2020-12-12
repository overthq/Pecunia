import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';
// import { useAppSelector } from '../redux/store';

// TODO: Move types and mock data to Redux store.

interface Transaction {
  hash: string;
}

const transactions: Transaction[] = [];

const RecentTransactions = () => {
  // const {} = useAppSelector(({ wallet }) => wallet.accounts[0].id);
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
        keyExtractor={t => t.hash}
        data={transactions}
        renderItem={({ item }) => (
          <View>
            <Text>{item.hash}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default RecentTransactions;
