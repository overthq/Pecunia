import React from 'react';
import { View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { AppStackParamList } from '../types/navigation';
import NewSection from '../components/new/NewSection';

// This copy is terrible and (very) temporary.
// The subscription page should usually be reached via a deep link.
// TODO: Rename Kind to something more reasonable.

interface Kind {
  title: string;
  description: string;
  destination: keyof AppStackParamList;
}

const kinds: Kind[] = [
  {
    title: 'Send',
    description: 'Send money to someone.',
    destination: 'SendAmount'
  },
  {
    title: 'Split Payment',
    description: 'Split a bill with one or more people.',
    destination: 'SplitPayment'
  },
  {
    title: 'Subscription',
    description: 'Pay someone a fixed amount every fixed interval.',
    destination: 'Subscription'
  }
];

const New = () => {
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  const moveToDestination = React.useCallback(
    (destination: keyof AppStackParamList) => {
      navigate(destination);
    },
    [navigate]
  );

  return (
    <View style={{ flex: 1 }}>
      {kinds.map(k => (
        <NewSection
          key={k.title}
          title={k.title}
          description={k.description}
          onPress={() => moveToDestination(k.destination)}
        />
      ))}
    </View>
  );
};

export default New;
