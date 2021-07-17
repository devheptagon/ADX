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
  SET_CONTENTS_TYPE,
  SET_TOP_ADVERTS_TYPE,
  SET_PAGE_TYPE,
} from "./actionTypes";

export const setLoadingAction = (loading) => ({
  type: SET_LOADING_TYPE,
  payload: { loading },
});

export const setContentsAction = (val) => ({
  type: SET_CONTENTS_TYPE,
  payload: { contents: val },
});

export const setSectorFilterAction = (val) => ({
  type: SET_SECTOR_FILTER_TYPE,
  payload: { sectorFilter: val },
});

export const setAreaFilterAction = (val) => ({
  type: SET_AREA_FILTER_TYPE,
  payload: { areaFilter: val },
});

export const setTenureFilterAction = (val) => ({
  type: SET_TENURE_FILTER_TYPE,
  payload: { tenureFilter: val },
});

export const setKeywordFilterAction = (val) => ({
  type: SET_KEYWORDS_FILTER_TYPE,
  payload: { keywordFilter: val },
});

export const setMinPriceFilterAction = (val) => ({
  type: SET_MINPRICE_FILTER_TYPE,
  payload: { minPriceFilter: val },
});

export const setMaxPriceFilterAction = (val) => ({
  type: SET_MAXPRICE_FILTER_TYPE,
  payload: { maxPriceFilter: val },
});

/* export const setAdvertsAction = (val) => ({
  type: SET_ADVERTS_TYPE,
  payload: { adverts: val },
}); */

export const setTopAdvertsAction = (val) => ({
  type: SET_TOP_ADVERTS_TYPE,
  payload: { topAdverts: val },
});

export const setSectorsAction = (val) => ({
  type: SET_SECTORS_TYPE,
  payload: { sectors: val },
});

export const setAreasAction = (val) => ({
  type: SET_AREAS_TYPE,
  payload: { areas: val },
});

export const setKeywordsAction = (val) => ({
  type: SET_KEYWORDS_TYPE,
  payload: { keywords: val },
});

export const setFirstLoadAction = () => ({
  type: SET_FIRSTLOAD_TYPE,
});

export const resetFiltersAction = () => ({
  type: RESET_FILTERS_TYPE,
});

export const setPageAction = (val) => ({
  type: SET_PAGE_TYPE,
  payload: { page: val },
});
