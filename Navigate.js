import React, { useEffect } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { useSelector } from 'react-redux';
import DialogScreen from './components/DialogScreen';
import MainScreen from './components/MainsScreen';
import RateScreen from './components/RateScreen';
import WaitScreen from './components/WaitScreen';

const scenes = Actions.create(
  <Router>
    <Scene key="main" component={MainScreen} title="Главная страница" />
    <Scene key="waiting" component={WaitScreen} title="Ожидание" />
    <Scene key="active" component={DialogScreen} title="Диалог" />
    <Scene key="rate" component={RateScreen} title="Оценка диалога" />
  </Router>,
);

const Navigate = () => {
  const { status } = useSelector(state => state.chat.chat);
  useEffect(() => {
    if (status === 'offline') {
      Actions.push('main');
    } else {
      Actions.push(status);
    }
  }, []);
  return <Router scenes={scenes} />;
};

export default Navigate;
