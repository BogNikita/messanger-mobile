import { combineReducers } from 'redux';
import themes from './themes';
import queue from './queue';

const rootReducer = combineReducers({
  themes,
  queue,
});

export default rootReducer;
