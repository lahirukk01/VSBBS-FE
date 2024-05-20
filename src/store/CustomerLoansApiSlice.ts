import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {addAuthHeader, buildBaseUrl} from '~/store/helpers.ts';
import {
  TCreateCustomerLoanFetchArgs, TCreateCustomerLoanPaymentFetchArgs,
  TDeleteCustomerLoanFetchArgs,
  TUpdateCustomerLoanFetchArgs
} from '~/pages/customer-loans/types.ts';

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
    createCustomerLoanPayment: builder.mutation({
      query: ({ pathParams, payload }: TCreateCustomerLoanPaymentFetchArgs) => ({
        url: `/${pathParams.customerId}/loans/${pathParams.loanId}/payments`,
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
    deleteCustomerLoan: builder.mutation({
      query: ({ pathParams }: TDeleteCustomerLoanFetchArgs) => ({
        url: `/${pathParams.customerId}/loans/${pathParams.loanId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFetchCustomerLoansQuery,
  useCreateCustomerLoanMutation,
  useUpdateCustomerLoanMutation,
  useDeleteCustomerLoanMutation,
  useCreateCustomerLoanPaymentMutation,
} = customerLoansApi;
