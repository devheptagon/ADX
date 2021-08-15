import axios from "axios";
import { apiUrl } from "../config";

export const getAdverts = async (filters) => {
  //send null if all selected (sectors, tags, tenures);

  const payload = {
    page: filters.page.toString(),
    selectedSectors:
      filters.selectedSectors && filters.selectedSectors.length
        ? filters.selectedSectors.map((s) => s.value).join(",")
        : null,
    //named selectedCities in backend request
    selectedCities:
      filters.selectedAreas && filters.selectedAreas.length
        ? filters.selectedAreas.map((s) => s.value).join(",")
        : null,
    selectedTenures:
      filters.selectedTenures && filters.selectedTenures.length
        ? filters.selectedTenures.map((s) => s.value).join(",")
        : null,
    selectedKeywords:
      filters.selectedKeywords && filters.selectedKeywords.length
        ? filters.selectedKeywords.map((s) => s.value).join(",")
        : null,
    selectedMinPrice: filters.selectedMinPrice?.toString(),
    selectedMaxPrice: filters.selectedMaxPrice?.toString(),
  };

  const response = await axios.post(apiUrl + "adverts", payload);
  return response.data;
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
  const response = await axios.get(apiUrl + "advert/" + id);
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
  await axios.post(apiUrl + "enquiries", { data: { ...values } });
};
