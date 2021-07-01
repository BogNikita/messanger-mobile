import { put, takeLatest, delay } from 'redux-saga/effects';
import storage from '@react-native-firebase/storage';
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
  animatedNewMessage,
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
    const index = Number(Object.keys(data.val())[0]);
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
    let imgSrc = '';
    if (message.imgSrc) {
      yield storage().ref(`images/${id}_${index}.jpg`).putFile(message.imgSrc);
      imgSrc = yield storage()
        .ref(`images/${id}_${index}.jpg`)
        .getDownloadURL();
    }
    yield firebase
      .database()
      .ref(`chatList/${id - 1}/messages/${index}`)
      .set({ ...message, imgSrc });
    yield put(addNewMessage({ ...message, imgSrc }));
  } catch (e) {
    yield put(fetchChatError(e.message));
  }
}

function* fetchChatEndWorker({ id, rate }) {
  try {
    yield firebase
      .database()
      .ref(`chatList/${id - 1}`)
      .update({ status: 'offline', chatRate: rate });
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
