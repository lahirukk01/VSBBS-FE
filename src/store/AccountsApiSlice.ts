import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {addAuthHeader, buildBaseUrl} from '~/store/helpers.ts';

export type TFetchAccountsRequestParams = {
  pathParams: {
    customerId: number;
    accountId: number;
  };
  queryParams: {
    onDate: string | null;
    fromDate: string | null;
    toDate: string | null;
    page: number;
  };
};

export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: buildBaseUrl('account-service/'),
    prepareHeaders: addAuthHeader,
  }),
  endpoints: (builder) => ({
    fetchAccounts: builder.query({
      query: (customerId: number) => `/${customerId}/accounts`,
    }),
    fetchAccountTransactions: builder.query({
      query: ({pathParams, queryParams}: TFetchAccountsRequestParams) => ({
        url: `/${pathParams.customerId}/accounts/${pathParams.accountId}/transactions`,
        params: queryParams,
      }),
    }),
    // submitProfileUpdateOtp: builder.mutation({
    //   query: (payload: TOtpSubmitRequestPayload) => ({
    //     url: 'profile/otp',
    //     method: 'POST',
    //     body: payload,
    //   }),
    // }),
  })
});

export const {
  useFetchAccountsQuery,
  useFetchAccountTransactionsQuery
} = accountsApi;
