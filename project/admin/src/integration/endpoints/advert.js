import { call, verbs } from "../api";

export const getAdvertsEP = async (page, userId) => {
  return call(verbs.post, "adverts", null, { page: page.toString(), userId });
};

export const getAdvertEP = async (id) => {
  const response = await call(verbs.get, "advert/" + id);
  return response?.data.length ? response?.data[0] : {};
};

export const deleteAdvertEP = async (id) => {
  await call(verbs.delete, `adverts/${id}`);
};

export const updateAdvertsEP = async (data) => {
  Object.keys(data).map((k) => {
    if (typeof data[k] === "number") data[k] = data[k].toString();
    return null;
  });
  const response = await call(verbs.patch, "advert", null, data);
  return response?.data;
};

export const addAdvertsEP = async (data) => {
  Object.keys(data).map((k) => {
    if (typeof data[k] === "number") data[k] = data[k].toString();
    return null;
  });

  const response = await call(verbs.post, "advert", null, data);
  return response?.data;
};

export const uploadEP = async (data) => {
  const response = await call(verbs.post, "upload", null, data, false, true);
  return response || "";
};
