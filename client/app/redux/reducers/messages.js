import {
  GET_MESSAGES_START,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAILURE,
  CREATE_MESSAGES_START,
  CREATE_MESSAGES_SUCCESS,
  CREATE_MESSAGES_FAILURE,
  DELETE_MESSAGES_START,
  DELETE_MESSAGES_SUCCESS,
  DELETE_MESSAGES_FAILURE,
  UPDATE_MESSAGES_START,
  UPDATE_MESSAGES_SUCCESS,
  UPDATE_MESSAGES_FAILURE,
} from '../actions/types';
let initialState = {
  isLoading: false,
  data: {},
  error: null,
  selectedUser: {},
};

const message = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES_START:
    case CREATE_MESSAGES_START:
    case DELETE_MESSAGES_START:
    case UPDATE_MESSAGES_START:
      return {...state, isLoading: true, ...action?.payload};
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case GET_MESSAGES_FAILURE:
    case CREATE_MESSAGES_FAILURE:
    case DELETE_MESSAGES_FAILURE:
    case UPDATE_MESSAGES_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case CREATE_MESSAGES_SUCCESS:
      return {
        ...state, 

        isLoading: false,
      };
    case DELETE_MESSAGES_SUCCESS:
      return {
        ...state,

        isLoading: false,
      };
    case UPDATE_MESSAGES_SUCCESS:
      return {
        ...state,

        isLoading: false,
      };
    
    default:
      return state;
  }
};

export default message;
