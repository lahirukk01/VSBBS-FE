import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {addAuthHeader, buildBaseUrl} from '~/store/helpers.ts';
import {TTransferMoneyFetchArgs} from '~/pages/customer-beneficiaries/types.ts';

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
    transferMoney: builder.mutation({
      query: ({ pathParams, payload }: TTransferMoneyFetchArgs) => ({
        url: `/${pathParams.customerId}/accounts/${pathParams.accountId}/transactions`,
        method: 'POST',
        body: payload,
      }),
    }),
  })
});

export const {
  useFetchAccountsQuery,
  useFetchAccountTransactionsQuery,
  useTransferMoneyMutation
} = accountsApi;
