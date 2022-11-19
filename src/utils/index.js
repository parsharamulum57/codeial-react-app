import { API_URLS, LOCALSTOREGE_TOKEN_KEY } from './constants';

export { API_URLS, LOCALSTOREGE_TOKEN_KEY };

export const getFormBody = (params) => {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
    let encodedValue = encodeURIComponent(params[property]); // aakash 123 => aakash%2020123

    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&'); // 'username=aakash&password=123213'
};

export const setItemInLocalStorage = (key, value) => {
  if (!key || !value) {
    console.error('Key or Value is empty');
    return;
  }

  let valueToStore = typeof value === 'string' ? value : JSON.stringify(value);

  localStorage.setItem(key, valueToStore);
};

export const getItemInLocalStorage = (key) => {
  if (!key) {
    console.error('Key or Value is empty');
    return;
  }

  return localStorage.getItem(key);
};

export const removeItemInLocalStorage = (key) => {
  if (!key) {
    console.error('Key or Value is empty');
    return;
  }

  localStorage.removeItem(key);
};
