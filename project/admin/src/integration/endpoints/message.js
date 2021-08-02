import { call, verbs } from "../api";

export const getMessagesEP = async () => {
  const response = await call(verbs.get, "messages");
  return response?.data;
};

export const updateMessageSeenEP = async () => {
  const response = await call(verbs.patch, "messages", null);
  return response?.data;
};

export const addMessageEP = async (data) => {
  const response = await call(verbs.post, "messages", null, {
    data,
  });
  return response?.data;
};
