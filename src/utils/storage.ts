export const getLocalStorage = (key: string) => {
  let value =
    localStorage.getItem(key) && localStorage.getItem(key) !== "undefined"
      ? localStorage.getItem(key)
      : null;
  return value !== null ? JSON.parse(value) : null;
};

export const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
