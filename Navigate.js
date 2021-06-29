import React from 'react';
import { Stack, Scene, Router } from 'react-native-router-flux';
import DialogScreen from './components/DialogScreen';
import MainScreen from './components/MainsScreen';
import WaitScreen from './components/WaitScreen';


const Navigate = () => (
  <Router>
    <Stack key="root">
      <Scene key="main" component={MainScreen} title="Главная страница" />
      <Scene key="wait" component={WaitScreen} title="Ожидание" />
      <Scene key="dialog" component={DialogScreen} title="Диалог" />
    </Stack>
  </Router>
);

export default Navigate;
