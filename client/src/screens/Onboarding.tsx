import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import { AppStackParamList } from '../types/navigation';

const Onboarding = () => {
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  const createWallet = () => {
    console.log('foo');
  };

  const goToImport = () => {
    navigate('Import');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Onboarding</Text>
      <Button
        text='Create wallet'
        onPress={createWallet}
        style={{ marginBottom: 8 }}
      />
      <Button text='Import wallet' onPress={goToImport} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 16
  }
});

export default Onboarding;