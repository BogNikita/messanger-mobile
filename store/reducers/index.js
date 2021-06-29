import { combineReducers } from 'redux';
import themes from './themes';
import queue from './queue';
import chat from './chat';

const rootReducer = combineReducers({
  themes,
  queue,
  chat,
});

export default rootReducer;
