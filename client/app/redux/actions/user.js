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
} from './types';

import api from 'api';
import {parseJwt} from 'helpers';
import {useRouter} from 'next/router'
// import message from '../reducers/messages';

export const login = (params) => {
  return async dispatch => {
    dispatch({type: LOGIN_START, payload: {...params}});
    try {
      const data = await api.create('/user/login', params);
      dispatch({type: LOGIN_SUCCESS, payload: parseJwt(data?.data?.token), token: data?.data?.token});
    } catch (e) {
      dispatch({type: LOGIN_FAILURE, payload: e});
    }
  };
};

export const signup = (params) => {
  return async dispatch => {
    dispatch({type: SIGNUP_START, payload: {...params}});
    try {
      const data = await api.create('/user', params);
      if(data?.status === 201){
        dispatch({type: SIGNUP_SUCCESS, payload: data?.data});
        const router = useRouter();
        router.push('/account/login');
      } else {
        dispatch({type: SIGNUP_FAILURE, payload: data?.message});
      }
    } catch (e) {
      dispatch({type: SIGNUP_FAILURE, payload: e});
    }
  };
};

export const logout = () => ({
  type: LOGOUT
});

export const setUserError = payload => ({
  type: SET_ERROR,
  payload: payload,
});


export const getUsers = (params = {}) => {
  return async dispatch => {
    dispatch({type: GET_USER_START, payload: {...params}});
    try {
      const data = await api.get('/user', params);
      dispatch({type: GET_USER_SUCCESS, payload: data});
    } catch (e) {
      dispatch({type: GET_USER_FAILURE, payload: e});
    }
  };
};


export const editUser = (id, params) => {
  return async dispatch => {
    dispatch({type: EDIT_USER_START, payload: {...params}});
    try {
      const data = await api.update(`/user/${id}`, params);
      if(data?.status === 201){
        dispatch({type: EDIT_USER_SUCCESS, payload: data?.data});
      } else {
        dispatch({type: EDIT_USER_FAILURE, payload: data?.message});
      }
    } catch (e) {
      dispatch({type: EDIT_USER_FAILURE, payload: e});
    }
  };
};