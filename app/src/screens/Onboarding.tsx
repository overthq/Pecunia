import React from 'react';
import {
  View,
  Text,
  Animated,
  FlatList,
  Dimensions,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../components/Button';

const { width } = Dimensions.get('window');

const steps = [
  {
    title: 'Welcome to Pecunia',
    description: ''
  },
  {
    title: 'Crypto made simple',
    description: ''
  },
  {
    title: 'Get Started',
    description: 'You can create a new wallet, or import an existing one.'
  }
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Onboarding: React.FC = () => {
  const [slideIndex, setSlideIndex] = React.useState(0);
  const flatListRef = React.useRef<FlatList>(null);
  const scrollX = new Animated.Value(0);

  const handleNextAction = () => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: slideIndex + 1
    });
  };

  const handleScrollEvent = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: true }
  );

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedFlatList
        ref={flatListRef}
        data={steps}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={step => step.title}
        snapToInterval={width}
        decelerationRate={0}
        onScroll={handleScrollEvent}
        onMomentumScrollEnd={({
          nativeEvent: {
            contentOffset: { x }
          }
        }) => {
          setSlideIndex(x ? x / width : 0);
        }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
      <View style={{ width: '100%', paddingHorizontal: 20, height: 60 }}>
        {slideIndex < 2 ? (
          <Button text='Next' onPress={handleNextAction} />
        ) : (
          <Button text='Done' onPress={() => console.log('thing')} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  slide: {
    width,
    height: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 32,
    marginBottom: 8,
    color: '#505050',
    fontWeight: 'bold'
  },
  description: {
    fontSize: 20
  }
});

export default Onboarding;
