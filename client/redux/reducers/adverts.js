import {
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SELECT_ADVERT,
  NEW_ADVERT_START,
  NEW_ADVERT_SUCCESS,
  NEW_ADVERT_FAILURE,
  CREATE_ADVERT_START,
  CREATE_ADVERT_SUCCESS,
  CREATE_ADVERT_FAILURE,
  DELETE_ADVERT_START,
  DELETE_ADVERT_SUCCESS,
  DELETE_ADVERT_FAILURE,
  UPDATE_ADVERT_START,
  UPDATE_ADVERT_SUCCESS,
  UPDATE_ADVERT_FAILURE,
} from '../actions/types';
let initialState = {
  isLoading: false,
  data: {},
  error: null,
  selectedAdvert: {},
};

const adverts = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_START:
    case NEW_ADVERT_START:
    case CREATE_ADVERT_START:
    case DELETE_ADVERT_START:
    case UPDATE_ADVERT_START:
      return {...state, isLoading: true, ...action?.payload};
    case SEARCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case SEARCH_FAILURE:
    case NEW_ADVERT_FAILURE:
    case CREATE_ADVERT_FAILURE:
    case DELETE_ADVERT_FAILURE:
    case UPDATE_ADVERT_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case SELECT_ADVERT:
      return {
        ...state, 
        selectedAdvert: state.data?.data?.filter(item => item.advertID === action.payload)[0]
      };
    case NEW_ADVERT_SUCCESS:
      return {
        ...state,
        newAdvertID: action.payload,
        isLoading: false,
      };
    case CREATE_ADVERT_SUCCESS:
      return {
        ...state,
        newAdvertID: undefined,
        isLoading: false,
      };
    case DELETE_ADVERT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_ADVERT_SUCCESS:
      return {
        ...state,
        selectedAdvert: {},
        isLoading: false,
      };

    default:
      return state;
  }
};

export default adverts;
