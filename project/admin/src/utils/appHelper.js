import {
  readLocalStorage,
  writeLocalStorage,
  clearLocalStorage,
} from "./genericHelper";
import { validateTokenEP } from "integration/endpoints/auth";

const storageKey = "token";

export const checkLocalToken = () => {
  return readLocalStorage(storageKey);
};

export const setLocalToken = (token) => {
  writeLocalStorage(storageKey, token);
};

export const validateToken = async (token) => {
  return validateTokenEP(token);
};

export const clearLocalToken = () => {
  clearLocalStorage();
};
