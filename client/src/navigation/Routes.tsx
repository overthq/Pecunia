import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Import from '../screens/Import';
import Contacts from '../screens/Contacts';
import SendAmount from '../screens/SendAmount';
import { AppStackParamList } from '../types/navigation';
import AddContact from '../screens/AddContact';
import Transactions from '../screens/Transactions';
import New from '../screens/New';
import { useAppSelector } from '../redux/store';

const AppStack = createStackNavigator<AppStackParamList>();

const Routes = () => {
  const walletAddress = useAppSelector(({ wallet }) => wallet.address);

  return (
    <AppStack.Navigator>
      {walletAddress ? (
        <AppStack.Group>
          <AppStack.Screen name='Home' component={Home} />
          <AppStack.Screen name='Contacts' component={Contacts} />
          <AppStack.Screen name='Settings' component={Settings} />
          <AppStack.Screen name='SendAmount' component={SendAmount} />
          <AppStack.Screen name='AddContact' component={AddContact} />
          <AppStack.Screen name='Transactions' component={Transactions} />
          <AppStack.Screen name='New' component={New} />
        </AppStack.Group>
      ) : (
        <AppStack.Screen
          name='Import'
          component={Import}
          options={{ headerShown: false }}
        />
      )}
    </AppStack.Navigator>
  );
};

export default Routes;
