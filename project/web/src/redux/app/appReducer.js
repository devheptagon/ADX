import {
  SET_SECTOR_FILTER_TYPE,
  SET_AREA_FILTER_TYPE,
  SET_TENURE_FILTER_TYPE,
  SET_KEYWORDS_FILTER_TYPE,
  SET_MINPRICE_FILTER_TYPE,
  SET_MAXPRICE_FILTER_TYPE,
  SET_FIRSTLOAD_TYPE,
  RESET_FILTERS_TYPE,
  SET_SECTORS_TYPE,
  SET_AREAS_TYPE,
  SET_KEYWORDS_TYPE,
  SET_CONTENTS_TYPE,
  SET_TOP_ADVERTS_TYPE,
  SET_USER_INFO_TYPE,
} from "./actionTypes";
import cities from "../../data/city.json";
import { checkLocalUser } from "helpers/appHelper";

const localUser = checkLocalUser() || { name: "", role: "anonym" };

const initialState = {
  sectorFilter: [],
  areaFilter: [],
  tenureFilter: [],
  keywordFilter: [],
  minPriceFilter: 0,
  maxPriceFilter: 0,
  topAdverts: [],
  keywords: [],
  sectors: [],
  contents: {},
  areas: cities,
  tenures: ["Freehold", "Leasehold"],
  firstLoad: true,
  user_name: localUser.name,
  user_role: localUser.role,
};

export function appReducer(state = { ...initialState }, action) {
  switch (action.type) {
    case SET_CONTENTS_TYPE:
      return { ...state, contents: action.payload.contents };
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
    case SET_TOP_ADVERTS_TYPE:
      return {
        ...state,
        topAdverts: action.payload.topAdverts,
        adverts: action.payload.topAdverts,
      };
    case SET_SECTORS_TYPE:
      return { ...state, sectors: action.payload.sectors };
    case SET_AREAS_TYPE:
      return { ...state, areas: action.payload.areas };
    case SET_KEYWORDS_TYPE:
      return { ...state, keywords: action.payload.keywords };
    case SET_FIRSTLOAD_TYPE:
      return { ...state, firstLoad: false };
    case SET_USER_INFO_TYPE:
      return {
        ...state,
        user_name: action.payload.name,
        user_role: action.payload.role,
      };
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
