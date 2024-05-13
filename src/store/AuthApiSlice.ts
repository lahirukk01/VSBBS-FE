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
  }),
});

export const { useLoginMutation, useCustomerRegistrationMutation } = authApi;
