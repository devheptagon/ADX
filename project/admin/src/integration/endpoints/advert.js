import { call, verbs } from "../api";

export const getAdvertsEP = async (page) => {
  return call(verbs.post, "adverts", null, { page: page.toString() });
};
