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
} from './types';

import api from 'api';


export const getMessages = (params = {}) => {
  return async dispatch => {
    dispatch({type: GET_MESSAGES_START, payload: {...params}});
    try {
      const data = await api.get('/message', params);
      console.log('data is', data);
      dispatch({type: GET_MESSAGES_SUCCESS, payload: data});
    } catch (e) {
      dispatch({type: GET_MESSAGES_FAILURE, payload: e});
    }
  };
};