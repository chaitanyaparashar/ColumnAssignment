import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Button = (props) => {
  return (
    <TouchableOpacity onPress={props.onSubmit} style={styles.container}>
      <Text style={{...styles.textStyle, ...props.styles}}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2196f3',
    borderRadius: 8,
    elevation: 16,
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
