import {
  FETCH_THEMES_REQUEST,
  FETCH_THEMES_SUCCESS,
  FETCH_THEMES_FAILURE,
} from './action.type';

export function fetchThemesRequest() {
  return {
    type: FETCH_THEMES_REQUEST,
  };
}

export function fetchThemesSuccess(themes) {
  return {
    type: FETCH_THEMES_SUCCESS,
    themes,
  };
}

export function fetchThemesError(error) {
  return {
    type: FETCH_THEMES_FAILURE,
    error,
  };
}
