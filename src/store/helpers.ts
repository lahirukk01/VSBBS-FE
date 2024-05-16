import {BASE_URL} from '~/constants.ts';

export const buildBaseUrl = (urlPart: string) => {
  return `${BASE_URL}/${urlPart}`;
};

export const addAuthHeader = (headers: Headers) => {
  // Use Redux's `getState` function to access the current state
  const appData = JSON.parse(localStorage.getItem('vsbbaAuth') || '{}');
  const token = appData.bearerToken;
  // If the token exists, set it in the Authorization header
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};
