import {
  SET_LOADING_TYPE,
  SET_SECTOR_FILTER_TYPE,
  SET_AREA_FILTER_TYPE,
  SET_TENURE_FILTER_TYPE,
  SET_KEYWORDS_FILTER_TYPE,
  SET_MINPRICE_FILTER_TYPE,
  SET_MAXPRICE_FILTER_TYPE,
  SET_ADVERTS_TYPE,
} from "./actionTypes";

const initialState = {
  loading: false,
  sectorFilter: [],
  areaFilter: [],
  tenureFilter: [],
  keywordFilter: [],
  minPriceFilter: 0,
  maxPriceFilter: 0,
  adverts: [],
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_TYPE:
      return { ...state, loading: action.payload.loading };
    case SET_SECTOR_FILTER_TYPE:
      return { ...state, sectorFilter: action.payload.sectorFilter };
    case SET_AREA_FILTER_TYPE:
      return { ...state, areaFilter: action.payload.areaFilter };
    case SET_TENURE_FILTER_TYPE:
      return { ...state, tenureFilter: action.payload.tenureFilter };
    case SET_KEYWORDS_FILTER_TYPE:
      return { ...state, keywordFilter: action.payload.keywordFilter };
    case SET_MINPRICE_FILTER_TYPE:
      return { ...state, minPriceFilter: action.payload.minPriceFilter };
    case SET_MAXPRICE_FILTER_TYPE:
      return { ...state, maxPriceFilter: action.payload.maxPriceFilter };
    case SET_ADVERTS_TYPE:
      return { ...state, adverts: action.payload.adverts };
    default:
      return state;
  }
}
