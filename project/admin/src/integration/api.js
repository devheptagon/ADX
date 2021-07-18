import axios from "axios";
import { apiUrl } from "../config";
import { store } from "../redux/store";

const verbs = {
  get: "get",
  post: "post",
  patch: "patch",
  delete: "delete",
};

const call = async (verb, path, params, data) => {
  const token = store.getState().appReducer.token;
  if (token) {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  }

  const response =
    verb === verbs.get
      ? await axios.get(apiUrl + path + (params ? "?" + params : ""))
      : verb === verbs.post
      ? await axios.post(apiUrl + path, data)
      : verb === verbs.patch
      ? await axios.patch(apiUrl + path, data)
      : await axios.delete(apiUrl + path);

  checkAuthError(response.status);
  return response.data;
};

const checkAuthError = (status) => {
  if (status > 400 && status < 500) {
    //logout
  }
};

export const validateToken = async (token) => {
  return call(verbs.post, "validate", null, { token });
};
