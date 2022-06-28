import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import OneSignal from 'react-native-onesignal';
import moment from 'moment';
import 'moment/locale/ru';
import { PubNubProvider } from 'pubnub-react';
import { pubnub } from './config/pubnub.config';
import { store, persistor } from './store';
import Navigate from './Navigate';

OneSignal.setLogLevel(6, 0);
OneSignal.setAppId('966e76c3-8930-433d-85e4-d62f11e0bde9');
moment.locale('ru');

const App = () => {
  return (
    <PubNubProvider client={pubnub}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={styles.Container}>
            <Navigate />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    </PubNubProvider>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
});

export default App;
