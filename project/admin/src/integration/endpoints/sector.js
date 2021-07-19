import { call, verbs } from "../api";

export const getSectorsEP = async () => {
  const response = await call(verbs.get, "sectors");
  return response?.data;
};
