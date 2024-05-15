import {BASE_URL} from '~/constants.ts';

export const buildBaseUrl = (urlPart: string) => {
  return `${BASE_URL}/${urlPart}`;
};
