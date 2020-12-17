import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import RecentTransactions from '../components/RecentTransactions';
import { useAppSelector } from '../redux/store';

const Home = () => {
  const { navigate } = useNavigation();
  const accounts = useAppSelector(({ wallet: { accounts } }) => accounts);
  const primaryAccount = accounts.find(({ primary }) => primary === true);
  console.log(primaryAccount?.address);

  return (
    <SafeAreaView style={styles.container}>
      <Text>{primaryAccount?.name}</Text>
      <RecentTransactions />
      <View style={styles.fabContainer}>
        <TouchableOpacity
          onPress={() => navigate('SendAmount')}
          activeOpacity={0.8}
          style={styles.fab}
        >
          <Text style={styles.fabText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.fab}>
          <Text style={styles.fabText}>Request</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fabContainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 60,
    bottom: 80
  },
  fab: {
    height: 40,
    width: 120,
    borderRadius: 20,
    backgroundColor: '#505050',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF'
  }
});

export default Home;
