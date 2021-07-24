import { call, verbs } from "../api";

export const getContentsEP = async () => {
  const response = await call(verbs.get, "contents");
  return response?.data && response?.data.length ? response.data[0] : null;
};

export const updateContentsEP = async (data) => {
  const response = await call(verbs.patch, "contents", null, {
    data: { ...data },
  });
  return response?.data;
};
