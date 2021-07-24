import { call, verbs } from "../api";

export const getTagsEP = async () => {
  const response = await call(verbs.get, "tags");
  return response?.data;
};

export const updateTagsEP = async (data) => {
  const response = await call(verbs.patch, "tags", null, {
    data: { ...data },
  });
  return response?.data;
};

export const deleteTagEP = async (id) => {
  await call(verbs.delete, `tags/${id}`);
};

export const addTagEP = async (data) => {
  const response = await call(verbs.post, "tags", null, {
    data: { ...data },
  });
  return response?.data;
};
