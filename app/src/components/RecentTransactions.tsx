import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/store';
import { load } from '../redux/transactions/actions';

const RecentTransactions = () => {
  const transactions = useAppSelector(
    ({ transactions }) => transactions.transactions
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log(transactions);
  }, [transactions]);

  React.useEffect(() => {
    dispatch(load());
  }, []);

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
        keyExtractor={t => t.hash as string}
        data={transactions || []}
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
