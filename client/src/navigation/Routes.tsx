import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Import from '../screens/Import';
import Contacts from '../screens/Contacts';
import SendAmount from '../screens/SendAmount';
import AddContact from '../screens/AddContact';
import Transactions from '../screens/Transactions';
import New from '../screens/New';
import Preferences from '../screens/Preferences';
import Onboarding from '../screens/Onboarding';
import SplitPayment from '../screens/SplitPayment';
import Subscriptions from '../screens/Subscriptions';

import { useAppSelector } from '../redux/store';
import { AppStackParamList } from '../types/navigation';

const AppStack = createStackNavigator<AppStackParamList>();

const Routes: React.FC = () => {
  const walletAddress = useAppSelector(({ wallet }) => wallet.address);

  return (
    <AppStack.Navigator>
      {walletAddress ? (
        <AppStack.Group screenOptions={{ headerShown: false }}>
          <AppStack.Screen name='Home' component={Home} />
          <AppStack.Screen name='Contacts' component={Contacts} />
          <AppStack.Screen name='Settings' component={Settings} />
          <AppStack.Screen
            name='SplitPayment'
            component={SplitPayment}
            options={{ title: 'Split Payment' }}
          />
          <AppStack.Screen name='Subscriptions' component={Subscriptions} />
          <AppStack.Screen name='AddContact' component={AddContact} />
          <AppStack.Screen name='Transactions' component={Transactions} />
          <AppStack.Screen name='New' component={New} />
          <AppStack.Screen name='Preferences' component={Preferences} />
          <AppStack.Group screenOptions={{ presentation: 'modal' }}>
            <AppStack.Screen name='SendAmount' component={SendAmount} />
          </AppStack.Group>
        </AppStack.Group>
      ) : (
        <AppStack.Group screenOptions={{ headerShown: false }}>
          <AppStack.Screen name='Onboarding' component={Onboarding} />
          <AppStack.Screen name='Import' component={Import} />
        </AppStack.Group>
      )}
    </AppStack.Navigator>
  );
};

export default Routes;
