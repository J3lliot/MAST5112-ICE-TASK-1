import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [result, setResult] = useState('0');

  const handleValidation = (requireTwoInputs = true) => {
    if (number1 === '' || (requireTwoInputs && number2 === '')) {
      setResult('Enter a valid number');
      return false;
    }
    if (isNaN(number1) || (requireTwoInputs && isNaN(number2))) {
      setResult('Enter a valid number');
      return false;
    }
    return true;
  };

  const handleOperation = (operation) => {
    if (operation === 'sqrt') {
      if (handleValidation(false)) {
        setResult(Math.sqrt(parseFloat(number1)).toString());
      }
    } else if (handleValidation()) {
      let num1 = parseFloat(number1);
      let num2 = parseFloat(number2);
      switch (operation) {
        case '+':
          setResult((num1 + num2).toString());
          break;
        case '-':
          setResult((num1 - num2).toString());
          break;
        case '*':
          setResult((num1 * num2).toString());
          break;
        case '/':
          if (num2 === 0) {
            setResult('You cannot divide by 0');
          } else {
            setResult((num1 / num2).toString());
          }
          break;
        case '^':
          setResult(Math.pow(num1, num2).toString());
          break;
      }
    }
  };

  const getResultColor = () => {
    if (result === 'Enter a valid number' || result === 'You cannot divide by 0') {
      return 'white';
    }
    return '#fff';
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.resultText, { color: getResultColor() }]}>{result}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter first number"
          placeholderTextColor="#666"
          keyboardType="numeric"
          value={number1}
          onChangeText={setNumber1}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter second number"
          placeholderTextColor="#666"
          keyboardType="numeric"
          value={number2}
          onChangeText={setNumber2}
        />
      </View>

      <View style={styles.buttonContainer}>
        {['+', '-', '*', '/', '^', '√'].map((symbol) => (
          <TouchableOpacity
            key={symbol}
            style={styles.button}
            onPress={() => handleOperation(symbol === '√' ? 'sqrt' : symbol)}
          >
            <Text style={styles.buttonText}>{symbol}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  resultText: {
    fontSize: 36,
    marginBottom: 20,
    alignSelf: 'flex-end',
    width: '100%',
    textAlign: 'right',
    paddingRight: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#444',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#fff',
    backgroundColor: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 5,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});
