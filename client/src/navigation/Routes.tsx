import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Import from '../screens/Import';
import Contacts from '../screens/Contacts';

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name='Home' component={Home} />
      <AppStack.Screen name='Import' component={Import} />
      <AppStack.Screen name='Contacts' component={Contacts} />
      <AppStack.Screen name='Settings' component={Settings} />
    </AppStack.Navigator>
  );
};

export default Routes;
