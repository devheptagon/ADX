import { SET_TOKEN_TYPE } from "./actionTypes";

const initialState = {
  token: null,
};

export function appReducer(state = { ...initialState }, action) {
  switch (action.type) {
    case SET_TOKEN_TYPE:
      return { ...state, token: action.payload.token };
    default:
      return state;
  }
}
