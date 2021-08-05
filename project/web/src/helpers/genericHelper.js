export const validPhone = (val) =>
  new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$").test(val);

export const slugify = (val) =>
  val
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

export function useQuery(location) {
  return new URLSearchParams(location.search);
}

export const formatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 0,
});

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
