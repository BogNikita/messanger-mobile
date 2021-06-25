import React, { useCallback } from 'react';
import { Stack, Scene, Router } from 'react-native-router-flux';
import { useSelector } from 'react-redux';
import DialogScreen from './components/DialogScreen';
import MainScreen from './components/MainsScreen';
import WaitScreen from './components/WaitScreen';

const Navigate = () => {
  const { status } = useSelector(state => state.chat.chat);
  const activeScreen = useCallback(screen => screen === status, [status]);
  return (
    <Router>
      <Stack key="root">
        <Scene key="main" component={MainScreen} title="Главная страница" />
        <Scene
          key="wait"
          component={WaitScreen}
          title="Ожидание"
          initial={activeScreen('waiting')}
        />
        <Scene
          key="dialog"
          component={DialogScreen}
          title="Диалог"
          initial={activeScreen('active')}
        />
      </Stack>
    </Router>
  );
};

export default Navigate;
