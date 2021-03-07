import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT,
  SET_ERROR,
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  CREATE_USER_START,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  EDIT_USER_START,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
} from '../actions/types';
let initialState = {
  isLoading: false,
  data: {},
  error: null,
  selectedUser: {},
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
    case SIGNUP_START:
    case GET_USER_START:
    case CREATE_USER_START:
    case DELETE_USER_START:
    case EDIT_USER_START:
      return {...state, isLoading: true, ...action?.payload};
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        currentUser: action.payload,
        isLoading: false,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
        isLoading: false,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case SET_ERROR:
    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
    case GET_USER_FAILURE:
    case CREATE_USER_FAILURE:
    case DELETE_USER_FAILURE:
    case EDIT_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state, 

        isLoading: false,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,

        isLoading: false,
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
      };
    
    default:
      return state;
  }
};

export default users;
