import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';

import Home from './src/screens/Home';
import Settings from './src/screens/Settings';
import Wallet from './src/screens/Wallet';
import Import from './src/screens/Import';
import Send from './src/screens/Send';

import Icon, { getIconName } from './src/components/Icon';
import { persistor, store, useAppSelector } from './src/redux/store';

enableScreens();

const AppStack = createStackNavigator();
const HomeStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const MainNavigator = () => (
  <MainTab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => (
        <Icon name={getIconName(route.name)} color={color} size={28} />
      )
    })}
    tabBarOptions={{
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      showLabel: false
    }}
  >
    <MainTab.Screen name='Home'>
      {() => (
        <HomeStack.Navigator headerMode='none'>
          <HomeStack.Screen name='Overview' component={Home} />
          <HomeStack.Screen name='Send' component={Send} />
        </HomeStack.Navigator>
      )}
    </MainTab.Screen>
    <MainTab.Screen name='Settings' component={Settings} />
    <MainTab.Screen name='Wallet' component={Wallet} />
  </MainTab.Navigator>
);

const AppNavigator = () => {
  const hasAccounts = useAppSelector(
    ({ wallet }) => wallet.accounts.length !== 0
  );

  return (
    <AppStack.Navigator headerMode='none'>
      {hasAccounts ? (
        <AppStack.Screen name='Main' component={MainNavigator} />
      ) : (
        <AppStack.Screen name='Import' component={Import} />
      )}
    </AppStack.Navigator>
  );
};

const App = () => (
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  </PersistGate>
);

export default App;
