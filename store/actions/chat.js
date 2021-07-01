import {
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_SUCCESS,
  FETCH_CHAT_FAILURE,
  FETCH_CHAT_NEW_MESSAGE,
  ADD_NEW_MESSAGE,
  FETCH_CHAT_UPDATE,
  CHAT_UPDATE,
  CHAT_END,
  FETCH_CHAT_END,
} from './action.type';

export function fetchChatRequest(message) {
  return {
    type: FETCH_CHAT_REQUEST,
    message,
  };
}

export function fetchChatSuccess(status, messages, id) {
  return {
    type: FETCH_CHAT_SUCCESS,
    id,
    status,
    messages,
  };
}

export function fetchChatError(error) {
  return {
    type: FETCH_CHAT_FAILURE,
    error,
  };
}

export function fetchChatNewMessage(message, id, index) {
  return {
    type: FETCH_CHAT_NEW_MESSAGE,
    message,
    id,
    index,
  };
}

export function addNewMessage(message) {
  return {
    type: ADD_NEW_MESSAGE,
    message,
  };
}

export function fetchChatUpdate(id) {
  return {
    type: FETCH_CHAT_UPDATE,
    id,
  };
}

export function chatUpdate(chat) {
  return {
    type: CHAT_UPDATE,
    chat,
  };
}

export function fetchChatEnd(id, rate) {
  return {
    type: FETCH_CHAT_END,
    id,
    rate,
  };
}

export function chatEnd() {
  return {
    type: CHAT_END,
  };
}
