/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import firebase from 'firebase/app';
import 'firebase/database';
import { firebaseConfig } from './config/firebase.config';

firebase.initializeApp(firebaseConfig);

AppRegistry.registerComponent(appName, () => App);
