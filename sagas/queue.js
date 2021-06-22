import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_QUEUE_REQUEST } from '../store/actions/action.type';
import { fetchQueueError, fetchQueueSuccess } from '../store/actions/queue';
import firebase from 'firebase/app';

function* fetchQueueWorker() {
  try {
    const data = yield firebase
      .database()
      .ref('chatList')
      .orderByChild('status')
      .equalTo('waiting')
      .once('value');
    const length = data.val().length;
    yield put(fetchQueueSuccess(length));
  } catch (e) {
    yield put(fetchQueueError(e.message));
  }
}

function* fetchQueueWotcher() {
  yield takeLatest(FETCH_QUEUE_REQUEST, fetchQueueWorker);
}

export default fetchQueueWotcher;
