import { API_URLS, LOCALSTOREGE_TOKEN_KEY } from '../utils';

const customFetch = async (url, { body, ...customConfig }) => {
  let token = window.localStorage.getItem(LOCALSTOREGE_TOKEN_KEY);

  let headers = {
    'content-type': 'application/json',
    Accept: 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let config = {
    ...customConfig,
    headers: {
      headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    body = JSON.stringify(body);
  }

  try {
    let response = await fetch(url, config);
    let data = await response.json();

    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }

    throw new Error(data.message);
  } catch (error) {
    console.error('error in fetching ', error);
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getPost = (page = 1, limit = 5) => {
  return customFetch(API_URLS.posts(page, limit), {
    method: 'GET',
  });
};
