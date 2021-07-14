import {
  SET_LOADING_TYPE,
  SET_SECTOR_FILTER_TYPE,
  SET_AREA_FILTER_TYPE,
  SET_TENURE_FILTER_TYPE,
  SET_KEYWORDS_FILTER_TYPE,
  SET_MINPRICE_FILTER_TYPE,
  SET_MAXPRICE_FILTER_TYPE,
  SET_ADVERTS_TYPE,
  SET_FIRSTLOAD_TYPE,
  RESET_FILTERS_TYPE,
  SET_SECTORS_TYPE,
  SET_AREAS_TYPE,
  SET_KEYWORDS_TYPE,
} from "./actionTypes";
import cities from "../../data/city.json";

const initialState = {
  loading: false,
  sectorFilter: [],
  areaFilter: [],
  tenureFilter: [],
  keywordFilter: [],
  minPriceFilter: 0,
  maxPriceFilter: 0,
  adverts: [],
  keywords: [],
  sectors: [],
  areas: cities,
  tenures: ["Freehold", "Leasehold"],
  firstLoad: true,
};

export function appReducer(state = { ...initialState }, action) {
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
    case SET_SECTORS_TYPE:
      return { ...state, sectors: action.payload.sectors };
    case SET_AREAS_TYPE:
      return { ...state, areas: action.payload.areas };
    case SET_KEYWORDS_TYPE:
      return { ...state, keywords: action.payload.keywords };
    case SET_FIRSTLOAD_TYPE:
      return { ...state, firstLoad: false };
    case RESET_FILTERS_TYPE:
      return {
        ...state,
        sectorFilter: [],
        areaFilter: [],
        tenureFilter: [],
        keywordFilter: [],
        minPriceFilter: 0,
        maxPriceFilter: 0,
      };
    default:
      return state;
  }
}
