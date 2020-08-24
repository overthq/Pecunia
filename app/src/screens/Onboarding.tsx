import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const steps = [
  {
    title: 'Welcome to Pecunia',
    description: ''
  },
  {
    title: 'Crypto made simple',
    description: ''
  },
  {
    title: 'Get Started',
    description: (
      <View>
        <Text>You can create a new wallet, or import an existing one.</Text>
      </View>
    )
  }
];

const Onboarding: React.FC = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={steps}
        horizontal
        keyExtractor={step => step.title}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 18
  }
});

export default Onboarding;
