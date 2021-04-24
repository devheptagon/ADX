import { SET_LOADING_TYPE } from "./actionTypes";

export const setLoadingAction = (loading) => ({
  type: SET_LOADING_TYPE,
  payload: { loading },
});
