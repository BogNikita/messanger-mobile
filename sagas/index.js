import { all } from 'redux-saga/effects';
import fetchThemesWotcher from './themes';

export default function* rootSaga() {
  yield all([fetchThemesWotcher()]);
}
