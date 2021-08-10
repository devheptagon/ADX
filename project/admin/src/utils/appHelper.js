/* eslint-disable no-restricted-globals */
import {
  readLocalStorage,
  writeLocalStorage,
  clearLocalStorage,
} from "./genericHelper";
import { validateTokenEP } from "integration/endpoints/auth";
import { ROW_COUNT_PER_PAGE, MAX_PAGINATION_BUTTON_COUNT } from "config";

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

export const getPagerList = (currentPage, totalRowCount) => {
  let arr = [currentPage];
  const totalPageCount = Math.ceil(totalRowCount / ROW_COUNT_PER_PAGE);
  const pageButtonCount = Math.min(totalPageCount, MAX_PAGINATION_BUTTON_COUNT);
  while (arr.length < pageButtonCount) {
    const rightItem = arr[arr.length - 1] + 1;
    if (rightItem <= totalPageCount) {
      arr.push(rightItem);
    }
    if (arr.length < pageButtonCount) {
      const leftItem = arr[0] - 1;
      if (leftItem >= 1) {
        arr.unshift(leftItem);
      }
    }
  }

  return arr;
};

export const postParentMessage = (user) => {
  if (user) {
    parent.postMessage(
      {
        action: "login",
        name: user.fullname,
        role: user.role,
        avatar: user.avatar,
      },
      "*"
    );
  } else {
    parent.postMessage({ action: "logout" }, "*");
  }
};
