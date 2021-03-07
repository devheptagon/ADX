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
} from './types';

import api from 'api';

export const searchBySectorLocation = params => {
  return async dispatch => {
    dispatch({type: SEARCH_START, payload: {...params}});
    try {
      const data = await api.get('/advert', params);
      dispatch({type: SEARCH_SUCCESS, payload: data});
    } catch (e) {
      dispatch({type: SEARCH_FAILURE, payload: e});
    }
  };
};

export const selectAdvert = id => ({
  type: SELECT_ADVERT,
  payload: id
});

export const newAdvert = () => {
  return async dispatch => {
    dispatch({type: NEW_ADVERT_START});
    try {
      const data = await api.get('/advert/new');
      dispatch({type: NEW_ADVERT_SUCCESS, payload: data?.data.ID});
    } catch (e) {
      dispatch({type: NEW_ADVERT_FAILURE, payload: e});
    }
  };
}

export const createAdvert = advert => {
  return async dispatch => {
    dispatch({type: CREATE_ADVERT_START});
    try {
      const data = await api.create('/advert', advert);
      dispatch({type: CREATE_ADVERT_SUCCESS});
    } catch (e) {
      dispatch({type: CREATE_ADVERT_FAILURE, payload: e});
    }
  };
}

export const deleteAdvert = id => {
  return async dispatch => {
    dispatch({type: DELETE_ADVERT_START});
    try {
      const data = await api.remove(`/advert/${id}`);
      dispatch({type: DELETE_ADVERT_SUCCESS});
    } catch (e) {
      dispatch({type: DELETE_ADVERT_FAILURE, payload: e});
    }
  };
}

export const updateAdvert = (id, params) => {
  return async dispatch => {
    console.log(id);
    dispatch({type: UPDATE_ADVERT_START});
    try {
      const data = await api.update(`/advert/${id}`, params);
      console.log('response : ', data);
      dispatch({type: UPDATE_ADVERT_SUCCESS});
    } catch (e) {
      dispatch({type: UPDATE_ADVERT_FAILURE, payload: e});
    }
  };
}