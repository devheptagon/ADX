import { call, verbs } from "../api";

export const getSectorsEP = async () => {
  const response = await call(verbs.get, "sectors");
  return response?.data;
};

export const updateSectorsEP = async (data) => {
  const response = await call(verbs.patch, "sectors", null, {
    data: { ...data },
  });
  return response?.data;
};

export const deleteSectorEP = async (id) => {
  await call(verbs.delete, `sectors/${id}`);
};
