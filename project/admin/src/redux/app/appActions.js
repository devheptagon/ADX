import {
  SET_TOKEN_TYPE,
  SET_USER_TYPE,
  SET_SECTORS_TYPE,
  SET_FIRSTLOAD_TYPE,
  SET_TAGS_TYPE,
  SET_SELLERS_TYPE,
  SET_MESSSAGES_TYPE,
  LOGOUT_TYPE,
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

export const setTagsAction = (val) => ({
  type: SET_TAGS_TYPE,
  payload: { tags: val },
});

export const setSellersAction = (val) => ({
  type: SET_SELLERS_TYPE,
  payload: { sellers: val },
});

export const setMessagesAction = (val) => ({
  type: SET_MESSSAGES_TYPE,
  payload: { messages: val },
});

export const logoutAction = () => ({
  type: LOGOUT_TYPE,
});
