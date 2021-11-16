import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import Icon from '../Icon';

// Terrible component naming - I know

interface NewSectionProps {
  title: string;
  description: string;
  onPress(): void;
}

const NewSection: React.FC<NewSectionProps> = ({
  title,
  description,
  onPress
}) => (
  <Pressable style={styles.container} onPress={onPress}>
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
    <Icon name='chevron-right' />
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    marginHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#505050',
    borderBottomWidth: 1
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 16
  }
});

export default NewSection;
