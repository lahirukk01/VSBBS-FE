import {BASE_URL} from '~/constants.ts';

type TSessionData = {
  bearerToken: string;
  data: {
    eat: number;
    userId: number;
  };
};

export const buildBaseUrl = (urlPart: string) => {
  return `${BASE_URL}/${urlPart}`;
};

export const addAuthHeader = (headers: Headers) => {
  // Use Redux's `getState` function to access the current state
  const appData: TSessionData = JSON.parse(localStorage.getItem('vsbbaAuth') || '{}');
  const token = appData.bearerToken;
  // If the token exists, set it in the Authorization header
  if (token) {
    const currentTime = Math.floor(Date.now() / 1000);
    if (appData.data.eat >= currentTime) {
      localStorage.removeItem('vsbbaAuth');
      window.location.href = '/';
    }

    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};
