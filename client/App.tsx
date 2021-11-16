import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from './src/navigation/Routes';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <SafeAreaProvider>
            <Routes />
          </SafeAreaProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
