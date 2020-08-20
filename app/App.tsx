import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/tabs';
import { enableScreens } from 'react-native-screens';

import Home from './src/screens/Home';
import Settings from './src/screens/Settings';
import Onboarding from './src/screens/Onboarding';
import Wallet from './src/screens/Wallet';

import { store } from './src/redux/store';

enableScreens();

const AppStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <MainTab.Navigator>
      <MainTab.Screen name='Home' component={Home} />
      <MainTab.Screen name='Settings' component={Settings} />
      <MainTab.Screen name='Wallet' component={Wallet} />
    </MainTab.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack.Navigator>
          <AppStack.Screen name='Onboarding' component={Onboarding} />
          <AppStack.Screen name='Main' component={MainNavigator} />
        </AppStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
