import { put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_CHAT_END,
  FETCH_CHAT_NEW_MESSAGE,
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_UPDATE,
} from '../store/actions/action.type';
import {
  chatUpdate,
  fetchChatError,
  fetchChatSuccess,
  addNewMessage,
  chatEnd,
} from '../store/actions/chat';
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

function* fetchChatUpdateWorker({ id }) {
  try {
    const data = yield firebase
      .database()
      .ref(`chatList/${id - 1}`)
      .once('value');
    yield put(chatUpdate(data.val()));
  } catch (e) {
    yield put(fetchChatError(e.message));
  }
}

function* fetchAddNewMessageWorker({ message, id, index }) {
  try {
    yield firebase
      .database()
      .ref(`chatList/${id - 1}/messages/${index}`)
      .set({ ...message });
    yield put(addNewMessage(message));
  } catch (e) {
    yield put(fetchChatError(e.message));
  }
}

function* fetchChatEndWorker({ id }) {
  try {
    yield firebase
      .database()
      .ref(`chatList/${id - 1}/status`)
      .set('offline');
    yield put(chatEnd());
  } catch (e) {
    yield put(fetchChatError(e.message));
  }
}

function* fetchChatWotcher() {
  yield takeLatest(FETCH_CHAT_REQUEST, fetchChatWorker);
  yield takeLatest(FETCH_CHAT_UPDATE, fetchChatUpdateWorker);
  yield takeLatest(FETCH_CHAT_NEW_MESSAGE, fetchAddNewMessageWorker);
  yield takeLatest(FETCH_CHAT_END, fetchChatEndWorker);
}

export default fetchChatWotcher;
