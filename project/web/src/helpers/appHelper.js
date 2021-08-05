/* eslint-disable no-restricted-globals */
import {
  readLocalStorage,
  writeLocalStorage,
  clearLocalStorage,
} from "./genericHelper";

const storageKey = "user";

export const checkLocalUser = () => {
  return readLocalStorage(storageKey);
};

export const setLocalUser = (user) => {
  writeLocalStorage(storageKey, user);
};

export const clearLocalUser = () => {
  clearLocalStorage();
};
