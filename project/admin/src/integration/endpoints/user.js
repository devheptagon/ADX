import { call, verbs } from "../api";

export const getSellersEP = async () => {
  const response = await call(verbs.get, "sellers");
  return response?.data;
};

export const getSellerEP = async (id) => {
  const response = await call(verbs.get, "seller/" + id);
  return response?.data?.length ? response?.data[0] : {};
};

export const toggleSellerEP = async (id, active) => {
  const response = await call(verbs.patch, "toggle", null, {
    data: { id, active },
  });
  return response?.data;
};

export const getProfileEP = async (id) => {
  const response = await call(verbs.get, "user/" + id, null);
  return response?.data ? response?.data[0] : {};
};

export const updateProfileEP = async (data) => {
  const response = await call(verbs.patch, "users", null, {
    data,
  });
  return response?.data;
};

export const upgradeEP = async (data) => {
  const response = await call(verbs.post, "upgrade", null, {
    data,
  });
  return response?.data;
};
