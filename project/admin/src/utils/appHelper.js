/* eslint-disable no-restricted-globals */
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import {
  readLocalStorage,
  writeLocalStorage,
  clearLocalStorage,
} from "./genericHelper";
import { validateTokenEP } from "integration/endpoints/auth";
import { ROW_COUNT_PER_PAGE, MAX_PAGINATION_BUTTON_COUNT } from "config";

const storageKey = "token";

export const PaymentOptions = [
  { amount: "£6.99", months: "1" },
  { amount: "£34.99", months: "6" },
  { amount: "£69.99", months: "12" },
];

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

export const customAlert = (message, onClick) => {
  confirmAlert({
    title: "Info",
    message: message,
    buttons: [
      {
        label: "OK",
        onClick,
      },
    ],
  });
};

export const customConfirm = (message, confirmCallback, cancelCallback) => {
  confirmAlert({
    title: "Info",
    message: message,
    buttons: [
      {
        label: "Yes",
        onClick: async () => confirmCallback && confirmCallback(),
      },
      {
        label: "No",
        onClick: async () => cancelCallback && cancelCallback(),
      },
    ],
  });
};
