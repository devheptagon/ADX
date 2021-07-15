import axios from "axios";
import { setAdvertsAction, setLoadingAction } from "redux/app/appActions";
import { apiUrl } from "../config";

export const fillAdverts = async (filters, dispatch) => {
  dispatch(setLoadingAction(true));
  //fetch
  const results = null;
  dispatch(setLoadingAction(false));

  //TODO: PAGING
  dispatch(setAdvertsAction(results));
};

export const getContents = async () => {
  const response = await axios.get(apiUrl + "contents");
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
  const response = await axios.get(apiUrl + "adverts/1");
  return response.data?.data;
};

export const postEvaluationRequest = async (values) => {
  if (values.price) values.price = values.price.toString();
  if (values.area_size) values.area_size = values.area_size.toString();
  delete values.gdpr_agreement;
  await axios.post(apiUrl + "eval", values);
};
