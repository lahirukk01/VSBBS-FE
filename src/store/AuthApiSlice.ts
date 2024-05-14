import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type TLoginCredentials = {
  username: string;
  password: string;
};

export type TRegistrationDetails = TLoginCredentials & {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
};

export type TOtpSubmitRequestPayload = {
  otp: string;
  ownerIdentifier: string;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8765/registration-service/auth/' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: TLoginCredentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    customerRegistration: builder.mutation({
      query: (details: TRegistrationDetails) => ({
        url: 'registration/customer',
        method: 'POST',
        body: details,
      }),
    }),
    submitRegistrationOtp: builder.mutation({
      query: (payload: TOtpSubmitRequestPayload) => ({
        url: 'registration/customer/otp',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useCustomerRegistrationMutation,
  useSubmitRegistrationOtpMutation,
} = authApi;
