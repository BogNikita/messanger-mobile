import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_THEMES_REQUEST } from '../store/actions/action.type';
import { fetchThemesError, fetchThemesSuccess } from '../store/actions/themes';
import firebase from 'firebase/app';

function* fetchThemesWorker() {
  try {
    const data = yield firebase.database().ref('themes').once('value');
    yield put(fetchThemesSuccess(data.val()));
  } catch (e) {
    yield put(fetchThemesError(e.message));
  }
}

function* fetchThemesWotcher() {
  yield takeLatest(FETCH_THEMES_REQUEST, fetchThemesWorker);
}

export default fetchThemesWotcher;
