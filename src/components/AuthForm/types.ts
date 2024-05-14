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
