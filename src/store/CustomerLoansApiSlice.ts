import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {addAuthHeader, buildBaseUrl} from '~/store/helpers.ts';
import {TCreateCustomerLoanFetchArgs, TUpdateCustomerLoanFetchArgs} from '~/pages/customer-loans/types.ts';

export const customerLoansApi = createApi({
  reducerPath: 'customerLoansApi',
  baseQuery: fetchBaseQuery({
    baseUrl: buildBaseUrl('loan-service/'),
    prepareHeaders: addAuthHeader,
  }),
  endpoints: (builder) => ({
    fetchCustomerLoans: builder.query({
      query: (customerId: number) => `/${customerId}/loans`,
    }),
    createCustomerLoan: builder.mutation({
      query: ({ pathParams, payload }: TCreateCustomerLoanFetchArgs) => ({
        url: `/${pathParams.customerId}/loans`,
        method: 'POST',
        body: payload,
      }),
    }),
    updateCustomerLoan: builder.mutation({
      query: ({ pathParams, payload }: TUpdateCustomerLoanFetchArgs) => ({
        url: `/${pathParams.customerId}/loans/${pathParams.loanId}`,
        method: 'PUT',
        body: payload,
      }),
    }),
  }),
});

export const {
  useFetchCustomerLoansQuery,
  useCreateCustomerLoanMutation,
  useUpdateCustomerLoanMutation,
} = customerLoansApi;
