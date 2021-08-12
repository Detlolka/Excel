export function rootReducer(state, action) {
  let prevState;
  console.log(action, 'action');
  switch (action.type) {
    case 'TABLE_RESIZE':
      prevState = state.colstate || {};
      prevState[action.data.id] = action.data.value;
      return {...state, colstate: prevState}; // id, value
    default: return state;
  }
}
