import { SET_TOKEN_TYPE, SET_USER_TYPE } from "./actionTypes";

const initialState = {
  token: null,
  email: null,
  id: null,
  role: null,
  fullname: "",
};

export function appReducer(state = { ...initialState }, action) {
  switch (action.type) {
    case SET_TOKEN_TYPE:
      return { ...state, token: action.payload.token };
    case SET_USER_TYPE:
      const user = action.payload.user;
      return {
        ...state,
        token: user.token,
        email: user.email,
        id: user.id,
        role: user.role,
        fullname: user.fullname,
      };
    default:
      return state;
  }
}
