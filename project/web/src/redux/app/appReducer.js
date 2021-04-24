import { SET_LOADING_TYPE } from "./actionTypes";

const initialState = {
  loading: false,
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_TYPE:
      return { ...state, loading: action.payload.loading };

    default:
      return state;
  }
}
