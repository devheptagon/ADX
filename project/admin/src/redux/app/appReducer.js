import {
  SET_TOKEN_TYPE,
  SET_USER_TYPE,
  SET_FIRSTLOAD_TYPE,
  SET_SECTORS_TYPE,
  SET_TAGS_TYPE,
  SET_SELLERS_TYPE,
  SET_MESSSAGES_TYPE,
} from "./actionTypes";

const initialState = {
  sectors: [],
  tags: [],
  firstLoad: true,
  sellers: [],
  //user info
  id: null,
  token: null,
  email: null,
  role: null,
  fullname: null,
  phone: null,
  avatar: null,
  line1: null,
  line2: null,
  city: null,
  postcode: null,
  seller_until: null,
  messages: [],
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
        ...user,
        id: state.id || user.id,
        token: state.token || user.token,
        role: state.role || user.role,
      };
    case SET_FIRSTLOAD_TYPE:
      return { ...state, firstLoad: false };
    case SET_SELLERS_TYPE:
      return { ...state, sellers: action.payload.sellers };
    case SET_MESSSAGES_TYPE:
      return { ...state, messages: action.payload.messages };
    default:
      return state;
  }
}
