import axios from "axios";
import { apiUrl } from "../config";
import { store } from "../redux/store";

export const verbs = {
  get: "get",
  post: "post",
  patch: "patch",
  delete: "delete",
};

export const call = async (
  verb,
  path,
  params,
  data,
  dontCheckAuth = false,
  multipart = false
) => {
  const token = store.getState().appReducer.token;
  if (token) {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  }
  let config = undefined;
  if (multipart) {
    config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
  }

  const response =
    verb === verbs.get
      ? await axios
          .get(apiUrl + path + (params ? "?" + params : ""))
          .catch((exp) => checkAuthError(exp, dontCheckAuth))
      : verb === verbs.post
      ? await axios
          .post(apiUrl + path, data, config)
          .catch((exp) => checkAuthError(exp, dontCheckAuth))
      : verb === verbs.patch
      ? await axios
          .patch(apiUrl + path, data)
          .catch((exp) => checkAuthError(exp, dontCheckAuth))
      : await axios
          .delete(apiUrl + path)
          .catch((exp) => checkAuthError(exp, dontCheckAuth));

  return response?.data;
};

const checkAuthError = (exception, dontCheckAuth) => {
  if (!dontCheckAuth && exception.response.status === 401) {
    //todo: logout
  }
};
