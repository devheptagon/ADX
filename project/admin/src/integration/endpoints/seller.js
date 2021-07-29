import { call, verbs } from "../api";

export const getSellersEP = async () => {
  const response = await call(verbs.get, "sellers");
  return response?.data;
};

export const updateSellersEP = async (data) => {
  const response = await call(verbs.patch, "sellers", null, {
    data: { ...data },
  });
  return response?.data;
};

export const deleteSellerEP = async (id) => {
  await call(verbs.delete, `sellers/${id}`);
};

export const addSellerEP = async (data) => {
  const response = await call(verbs.post, "sellers", null, {
    data: { ...data },
  });
  return response?.data;
};
