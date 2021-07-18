/* eslint-disable no-bitwise */

export const delay = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

export const generateGuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const writeLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const readLocalStorage = (key) => {
  const data = readLocalStorageRaw(key);
  if (data && data.length) {
    return JSON.parse(data);
  }
  return null;
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

const readLocalStorageRaw = (key) => {
  return localStorage.getItem(key);
};

export const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

export const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};
