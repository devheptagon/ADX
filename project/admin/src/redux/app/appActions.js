import { SET_TOKEN_TYPE, SET_USER_TYPE } from "./actionTypes";

export const setTokenAction = (val) => ({
  type: SET_TOKEN_TYPE,
  payload: { token: val },
});

export const setUserAction = (val) => ({
  type: SET_USER_TYPE,
  payload: { user: val },
});
