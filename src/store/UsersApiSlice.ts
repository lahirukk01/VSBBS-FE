import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {addAuthHeader, buildBaseUrl} from '~/store/helpers.ts';
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
    prepareHeaders: addAuthHeader,
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



