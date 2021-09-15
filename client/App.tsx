import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from './src/navigation/Routes';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Routes />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
