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
  }
];

const Onboarding: React.FC = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={steps}
        horizontal
        keyExtractor={(step) => step.title}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
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

export default Onboarding;
