import {
  FETCH_CHAT_FAILURE,
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_SUCCESS,
  ADD_NEW_MESSAGE,
} from '../actions/action.type';

const initialState = {
  isPending: null,
  isSuccess: null,
  isError: null,
  errorMessage: null,
  chat: {
    id: null,
    messages: [],
    status: null,
  },
};

export default function chat(state = initialState, action) {
  switch (action.type) {
    case FETCH_CHAT_REQUEST:
      return {
        ...state,
        isPending: true,
      };
    case FETCH_CHAT_SUCCESS: {
      return {
        ...state,
        isPending: false,
        isSuccess: true,
        isError: null,
        errorMessage: null,
        chat: {
          id: action.id,
          messages: [action.messages],
          status: action.status,
        },
      };
    }
    case FETCH_CHAT_FAILURE: {
      return {
        ...state,
        isPending: false,
        isError: true,
        errorMessage: action.error,
      };
    }
    case ADD_NEW_MESSAGE: {
      return {
        ...state,
        chat: {
          ...state.chat,
          messages: [...state.chat.messages, action.messages],
        },
      };
    }
    default:
      return state;
  }
}
