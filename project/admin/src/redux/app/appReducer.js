import {
  SET_TOKEN_TYPE,
  SET_USER_TYPE,
  SET_FIRSTLOAD_TYPE,
  SET_SECTORS_TYPE,
  SET_TAGS_TYPE,
  SET_SELLERS_TYPE,
} from "./actionTypes";

const initialState = {
  token: null,
  email: null,
  id: null,
  role: null,
  fullname: "",
  sectors: [],
  tags: [],
  firstLoad: true,
  sellers: [],
};

export function appReducer(state = { ...initialState }, action) {
  switch (action.type) {
    case SET_SECTORS_TYPE:
      return { ...state, sectors: action.payload.sectors };
    case SET_TAGS_TYPE:
      return { ...state, tags: action.payload.tags };
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
    case SET_FIRSTLOAD_TYPE:
      return { ...state, firstLoad: false };
    case SET_SELLERS_TYPE:
      return { ...state, sellers: action.payload.sellers };
    default:
      return state;
  }
}
