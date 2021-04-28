import {
  SET_LOADING_TYPE,
  SET_SECTOR_FILTER_TYPE,
  SET_AREA_FILTER_TYPE,
} from "./actionTypes";

const initialState = {
  loading: false,
  sectorFilter: [],
  areaFilter: [],
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_TYPE:
      return { ...state, loading: action.payload.loading };
    case SET_SECTOR_FILTER_TYPE:
      return { ...state, sectorFilter: action.payload.sectorFilter };
    case SET_AREA_FILTER_TYPE:
      return { ...state, areaFilter: action.payload.areaFilter };

    default:
      return state;
  }
}
