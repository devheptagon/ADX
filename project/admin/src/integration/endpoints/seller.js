import { call, verbs } from "../api";

export const getSellersEP = async () => {
  const response = await call(verbs.get, "sellers");
  return response?.data;
};
