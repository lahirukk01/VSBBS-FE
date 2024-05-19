import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {addAuthHeader, buildBaseUrl} from '~/store/helpers.ts';

export const managerLoansApi = createApi({
  reducerPath: 'managerLoansApi',
  baseQuery: fetchBaseQuery({
    baseUrl: buildBaseUrl('loan-service/'),
    prepareHeaders: addAuthHeader,
  }),
  endpoints: (builder) => ({
    fetchManagerLoans: builder.query({
      query: () => '/loans',
    }),
    managerLoanDecisionSubmit: builder.mutation({
      query: ({ pathParams, payload }) => ({
        url: `/loans/${pathParams.loanId}/status`,
        method: 'PUT',
        body: payload
      }),
    }),
    managerFetchCreditScore: builder.query({
      query: (loanId: number) => `/loans/${loanId}/credit-score`,
    }),
  }),
});

export const {
  useFetchManagerLoansQuery,
  useManagerLoanDecisionSubmitMutation,
  useManagerFetchCreditScoreQuery,
} = managerLoansApi;
