import {TJwtPayload} from '~/components/AuthForm/types.ts';

export type TResponseError = {
  details: string;
  message: string;
  timestamp: string;
}

export type TErrorResponse = {
  status: number;
  data: {
    data: null;
    error: TResponseError;
  };
};

export type TUser = {
  username: string;
  firstName: string;
  lastName: string;
  email: string | null;
  mobile: string | null;
  id: number;
  role: string;
  onlineAccountStatus: string;
};

export type TOutletContext = {
  auth: TJwtPayload;
  user: TUser,
  setAuth: (auth: TJwtPayload) => void;
};
