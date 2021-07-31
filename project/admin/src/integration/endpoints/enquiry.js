import { call, verbs } from "../api";

export const getEnquiriesEP = async () => {
  const response = await call(verbs.get, "enquiries");
  return response?.data;
};

export const deleteEnquiryEP = async (id) => {
  await call(verbs.delete, `enquiries/${id}`);
};
