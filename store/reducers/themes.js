import {
  FETCH_THEMES_FAILURE,
  FETCH_THEMES_REQUEST,
  FETCH_THEMES_SUCCESS,
} from '../actions/action.type';

const initialState = {
  isPending: null,
  isSuccess: null,
  isError: null,
  errorMessage: null,
  themes: [],
};

export default function themes(state = initialState, action) {
  switch (action.type) {
    case FETCH_THEMES_REQUEST:
      return {
        ...state,
        isPending: true,
      };
    case FETCH_THEMES_SUCCESS: {
      return {
        ...state,
        isPending: false,
        isSuccess: true,
        isError: null,
        errorMessage: null,
        themes: action.themes,
      };
    }
    case FETCH_THEMES_FAILURE: {
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
