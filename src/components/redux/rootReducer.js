import {TABLE_RESIZE} from './types';

export function rootReducer(state, action) {
  let prevState;
  switch (action.type) {
    case TABLE_RESIZE:
      prevState = state.colstate || {};
      prevState[action.data.id] = action.data.value;
      return {...state, colstate: prevState}; // id, value
    default: return state;
  }
}
