import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Home from './components/Home/Home';

const App = () => {
  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <Home />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    flex: 1,
  },
});

export default App;
