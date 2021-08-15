/* eslint-disable no-restricted-globals */
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

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
        onClick: () => confirmCallback && confirmCallback(),
      },
      {
        label: "No",
        onClick: () => cancelCallback && cancelCallback(),
      },
    ],
  });
};
