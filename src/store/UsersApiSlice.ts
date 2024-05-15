import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {buildBaseUrl} from '~/store/helpers.ts';
import {TUser} from '~/types/common.ts';
import {TOtpSubmitRequestPayload} from '~/store/AuthApiSlice.ts';

export type TUserFetchResponseData = {
  user: TUser;
};

export type TUserFetchResponseSuccess = {
  data: TUserFetchResponseData;
  error: null;
};

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: buildBaseUrl('registration-service/users/'),
    prepareHeaders: (headers) => {
      // Use Redux's `getState` function to access the current state
      const appData = JSON.parse(localStorage.getItem('vsbbaAuth') || '{}');
      const token = appData.bearerToken;
      // If the token exists, set it in the Authorization header
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: (userId: number) => `/${userId}`,
    }),
    activateProfile: builder.mutation({
      query: (user: TUser) => ({
        url: 'profile',
        method: 'PUT',
        body: user,
      }),
    }),
    submitProfileUpdateOtp: builder.mutation({
      query: (payload: TOtpSubmitRequestPayload) => ({
        url: 'profile/otp',
        method: 'POST',
        body: payload,
      }),
    }),
  })
});

export const {
  useFetchUserQuery,
  useActivateProfileMutation,
  useSubmitProfileUpdateOtpMutation,
} = usersApi;



