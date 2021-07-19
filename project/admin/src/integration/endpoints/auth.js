import { call, verbs } from "../api";

export const validateTokenEP = async (token) => {
  const response = await call(verbs.post, "validate", null, { token }, true);
  return response ? true : false;
};

export const loginEP = async (email, password) => {
  return call(verbs.post, "login", null, { email, password }, true);
};
