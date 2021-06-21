import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Navigate from './Navigate';

const App = () => {
  return (
    <SafeAreaView style={styles.Container}>
      <Navigate />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
});

export default App;
