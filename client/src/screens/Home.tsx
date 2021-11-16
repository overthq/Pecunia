import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../types/navigation';
import Icon from '../components/Icon';

const Home = () => {
  const { navigate } = useNavigation<StackNavigationProp<AppStackParamList>>();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigate('New')}>
        <Icon name='plus' />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Home;
