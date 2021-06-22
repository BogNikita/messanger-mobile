import React from 'react';
import { Stack, Scene, Router } from 'react-native-router-flux';
import MainScreen from './components/MainsScreen';
import WaitScreen from './components/WaitScreen';

const Navigate = () => (
  <Router>
    <Stack key="root">
      <Scene key="main" component={MainScreen} title="Главная страница" />
      <Scene key="wait" component={WaitScreen} title="Ожидание" />
    </Stack>
  </Router>
);

export default Navigate;
