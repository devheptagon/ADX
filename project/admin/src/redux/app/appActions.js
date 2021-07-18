import { SET_TOKEN_TYPE } from "./actionTypes";

export const setTokenAction = (val) => ({
  type: SET_TOKEN_TYPE,
  payload: { token: val },
});
