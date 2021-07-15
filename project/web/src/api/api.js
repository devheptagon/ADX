import axios from "axios";
import { setAdvertsAction, setLoadingAction } from "redux/app/appActions";
import { apiUrl } from "../config";

export const fillAdverts = async (filters, dispatch) => {
  filters = {
    page: filters.page.toString(),
    selectedSectors: filters.selectedSectors
      ? filters.selectedSectors.join(",")
      : null,
    selectedAreas: filters.selectedAreas
      ? filters.selectedAreas.join(",")
      : null,
    selectedTenures: filters.selectedTenures
      ? filters.selectedTenures.join(",")
      : null,
    selectedKeywords: filters.selectedKeywords
      ? filters.selectedKeywords.join(",")
      : null,
    selectedMinPrice: filters.selectedMinPrice?.toString(),
    selectedMaxPrice: filters.selectedMaxPrice?.toString(),
  };
  dispatch(setLoadingAction(true));
  const response = await axios.post(apiUrl + "adverts", filters);
  const results = response.data?.data;
  dispatch(setAdvertsAction(results));
  dispatch(setLoadingAction(false));
};

export const getContents = async () => {
  const response = await axios
    .get(apiUrl + "contents")
    .catch((exp) => console.log(exp));
  return response.data?.data[0];
};

export const getSectors = async () => {
  const response = await axios.get(apiUrl + "sectors");
  return response.data?.data;
};

export const getKeywords = async () => {
  const response = await axios.get(apiUrl + "tags");
  return response.data?.data;
};

export const getAdvert = async (id) => {
  const response = await axios.get(apiUrl + "sector/" + id);
  return response.data?.data;
};

export const getTopAdverts = async () => {
  const response = await axios.post(apiUrl + "adverts", { page: "1" });
  return response.data?.data;
};

export const postEvaluationRequest = async (values) => {
  if (values.price) values.price = values.price.toString();
  if (values.area_size) values.area_size = values.area_size.toString();
  delete values.gdpr_agreement;
  await axios.post(apiUrl + "eval", values);
};
