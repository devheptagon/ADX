import { call, verbs } from "../api";

export const getAdvertsEP = async (page) => {
  return call(verbs.post, "adverts", null, { page: page.toString() });
};

export const deleteAdvertEP = async (id) => {
  await call(verbs.delete, `adverts/${id}`);
};

export const updateAdvertsEP = async (data) => {
  const response = await call(verbs.patch, "adverts", null, {
    data: { ...data },
  });
  return response?.data;
};

export const addAdvertsEP = async (data) => {
  const response = await call(verbs.post, "adverts", null, {
    data: { ...data },
  });
  return response?.data;
};

export const uploadEP = async (data) => {
  const response = await call(verbs.post, "upload", null, data, false, true);
  return response || "";
};
