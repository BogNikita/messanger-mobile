import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import Navigate from './Navigate';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.Container}>
        <Navigate />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
});

export default App;
