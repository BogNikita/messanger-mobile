import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import OneSignal from 'react-native-onesignal';
import { store } from './store';
import Navigate from './Navigate';

OneSignal.setLogLevel(6, 0);
OneSignal.setAppId('966e76c3-8930-433d-85e4-d62f11e0bde9');

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
