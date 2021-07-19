import {
  SET_TOKEN_TYPE,
  SET_USER_TYPE,
  SET_SECTORS_TYPE,
  SET_FIRSTLOAD_TYPE,
} from "./actionTypes";

export const setTokenAction = (val) => ({
  type: SET_TOKEN_TYPE,
  payload: { token: val },
});

export const setUserAction = (val) => ({
  type: SET_USER_TYPE,
  payload: { user: val },
});

export const setSectorsAction = (val) => ({
  type: SET_SECTORS_TYPE,
  payload: { sectors: val },
});

export const setFirstLoadAction = () => ({
  type: SET_FIRSTLOAD_TYPE,
});
