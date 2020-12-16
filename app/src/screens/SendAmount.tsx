import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SendAmount = () => {
  const [amount, setAmount] = React.useState('0');
  const [mode, setMode] = React.useState<'number' | 'choice'>('number');
  const numberPad = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [0]];

  const handleNumberPress = (num: number) => {
    if (Number(amount) === 0) setAmount(num.toString());
    else setAmount(amount + num.toString());
  };

  const handleContinuePress = () => {
    if (mode === 'number' && Number(amount) > 0) {
      setMode('choice');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.amountBar}>
        <Text style={styles.amountBarText}>{amount}</Text>
      </View>
      {mode === 'number' ? (
        numberPad.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((num, numIndex) => (
              <TouchableOpacity
                key={numIndex}
                style={styles.num}
                onPress={() => handleNumberPress(num)}
              >
                <Text style={styles.numText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))
      ) : (
        <View></View>
      )}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleContinuePress}
        disabled={Number(amount) === 0}
      >
        <Text style={styles.submitButtonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  amountBar: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  amountBarText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  row: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  num: {
    flexGrow: 0.25,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  numText: {
    fontSize: 24
  },
  submitButton: {
    padding: 15,
    borderRadius: 4,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF'
  }
});

export default SendAmount;
