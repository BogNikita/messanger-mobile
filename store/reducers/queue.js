import {
  FETCH_QUEUE_FAILURE,
  FETCH_QUEUE_REQUEST,
  FETCH_QUEUE_SUCCESS,
} from '../actions/action.type';

const initialState = {
  isPending: null,
  isSuccess: null,
  isError: null,
  errorMessage: null,
  queueLength: 0,
};

export default function QUEUE(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUEUE_REQUEST:
      return {
        ...state,
        isPending: true,
      };
    case FETCH_QUEUE_SUCCESS: {
      return {
        ...state,
        isPending: false,
        isSuccess: true,
        isError: null,
        errorMessage: null,
        queueLength: action.length,
      };
    }
    case FETCH_QUEUE_FAILURE: {
      return {
        ...state,
        isPending: false,
        isError: true,
        errorMessage: action.error,
      };
    }
    default:
      return state;
  }
}
