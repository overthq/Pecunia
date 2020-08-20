import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fab}>
          <Text style={styles.fabText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fab}>
          <Text style={styles.fabText}>Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  fabContainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 100,
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
