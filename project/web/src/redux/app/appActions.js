import {
  SET_LOADING_TYPE,
  SET_SECTOR_FILTER_TYPE,
  SET_AREA_FILTER_TYPE,
} from "./actionTypes";

export const setLoadingAction = (loading) => ({
  type: SET_LOADING_TYPE,
  payload: { loading },
});

export const setSectorFilterAction = (val) => ({
  type: SET_SECTOR_FILTER_TYPE,
  payload: { sectorFilter: val },
});

export const setAreaFilterAction = (val) => ({
  type: SET_AREA_FILTER_TYPE,
  payload: { areaFilter: val },
});
