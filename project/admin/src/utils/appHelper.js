import {
  readLocalStorage,
  writeLocalStorage,
  clearLocalStorage,
} from "./genericHelper";

const storageKey = "token";

export const checkLocalToken = () => {
  return readLocalStorage(storageKey);
};

export const setLocalToken = (token) => {
  writeLocalStorage(storageKey, token);
};

export const validateToken = (token) => {
  //api call here
  return true;
};

export const clearLocalToken = () => {
  clearLocalStorage();
};
