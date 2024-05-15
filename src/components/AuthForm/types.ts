export type TAuthFormFields = {
  formFirstName: { value: string };
  formLastName: { value: string };
  formMobileNumber: { value: string };
  formEmail: { value: string };
  formUsername: { value: string };
  formBasicPassword: { value: string };
};

export type TOtpGenerateResponse = {
  data: {
    ownerIdentifier: string;
    message: string;
  },
  error: null;
};

export type TOtpSubmitResponseData = {
  data: {
    token: string;
  }
};

export type TLoginResponseData = TOtpSubmitResponseData;

export type TScope = 'MANAGER' | 'CUSTOMER';

export type TJwtPayload = {
  sub: string,
  iat: number,
  exp: number,
  iss: string,
  scope: TScope[],
  onlineAccountStatus: string,
  userId: string | number,
};

export type AuthComponentProps = {
  auth: TJwtPayload;
  logout: () => void;
};
