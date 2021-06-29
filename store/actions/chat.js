import {
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_SUCCESS,
  FETCH_CHAT_FAILURE,
  FETCH_CHAT_NEW_MESSAGE,
  ADD_NEW_MESSAGE,
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

export function fetchChatNewMessage(message) {
  return {
    type: FETCH_CHAT_NEW_MESSAGE,
    message,
  };
}

export function addNewMessage(message) {
  return {
    type: ADD_NEW_MESSAGE,
    message,
  };
}
