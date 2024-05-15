import {TJwtPayload, TOtpSubmitResponseData} from '~/components/AuthForm/types.ts';

const getJwtPayload = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('')
    .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));
  return JSON.parse(jsonPayload);
};

export const storeSessionData = (data: TOtpSubmitResponseData) => {
  const decodedToken: TJwtPayload = getJwtPayload(data.data.token);
  const payloadToStore = {
    bearerToken: data.data.token,
    data: decodedToken
  };

  localStorage.setItem('vsbbaAuth', JSON.stringify(payloadToStore));
  return decodedToken;
};
