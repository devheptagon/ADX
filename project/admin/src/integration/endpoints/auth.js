import { call, verbs } from "../api";

export const validateTokenEP = async (token) => {
  return call(verbs.post, "validate", null, { token }, true);
};

export const loginEP = async (email, password) => {
  return call(verbs.post, "login", null, { email, password }, true);
};

export const forgotEP = async (email) => {
  return call(verbs.post, "forgot", null, { data: { email } }, true);
};

export const registerEP = async (email, password, fullname) => {
  return call(
    verbs.post,
    "register",
    null,
    { data: { email, password, fullname } },
    true
  );
};
