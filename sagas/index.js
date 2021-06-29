import { all } from 'redux-saga/effects';
import fetchThemesWotcher from './themes';
import fetchQueueWotcher from './queue';
import fetchChatWotcher from './chat';

export default function* rootSaga() {
  yield all([fetchThemesWotcher(), fetchQueueWotcher(), fetchChatWotcher()]);
}
