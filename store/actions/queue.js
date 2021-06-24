import {
  FETCH_QUEUE_REQUEST,
  FETCH_QUEUE_SUCCESS,
  FETCH_QUEUE_FAILURE,
} from './action.type';

export function fetchQueueRequest() {
  return {
    type: FETCH_QUEUE_REQUEST,
  };
}

export function fetchQueueSuccess(length) {
  return {
    type: FETCH_QUEUE_SUCCESS,
    length,
  };
}

export function fetchQueueError(error) {
  return {
    type: FETCH_QUEUE_FAILURE,
    error,
  };
}
