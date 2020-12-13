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
import TransactionStub from './TransactionStub';

const RecentTransactions = () => {
  const transactions = useAppSelector(
    ({ transactions }) => transactions.transactions
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(load());
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>Recent Transactions</Text>
        <TouchableOpacity>
          <Text>View all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.list}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={t => t.hash as string}
        data={transactions}
        renderItem={({ item }) => <TransactionStub transaction={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    height: 100
  }
});

export default RecentTransactions;
