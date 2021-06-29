import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_CHAT_REQUEST } from '../store/actions/action.type';
import { fetchChatError, fetchChatSuccess } from '../store/actions/chat';
import firebase from 'firebase/app';

function* fetchChatWorker({ message }) {
  try {
    const data = yield firebase
      .database()
      .ref('chatList')
      .orderByKey()
      .limitToLast(1)
      .once('value');
    const index = +Object.keys(data.val())[0];
    yield firebase
      .database()
      .ref(`chatList/${index + 1}`)
      .set({
        status: 'waiting',
        id: index + 2,
        messages: [message],
      });
    yield put(fetchChatSuccess('waiting', message, index + 2));
  } catch (e) {
    yield put(fetchChatError(e.message));
  }
}

function* fetchChatWotcher() {
  yield takeLatest(FETCH_CHAT_REQUEST, fetchChatWorker);
}

export default fetchChatWotcher;
