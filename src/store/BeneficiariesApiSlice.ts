import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {addAuthHeader, buildBaseUrl} from '~/store/helpers.ts';

export const beneficiariesApi = createApi({
  reducerPath: 'beneficiariesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: buildBaseUrl('beneficiary-service/'),
    prepareHeaders: addAuthHeader,
  }),
  endpoints: (builder) => ({
    fetchCustomerBeneficiaries: builder.query({
      query: (customerId: number) => `/${customerId}/beneficiaries`,
    }),
    createCustomerBeneficiary: builder.mutation({
      query: (data) => ({
        url: `/${data.customerId}/beneficiaries`,
        method: 'POST',
        body: data.payload,
      }),
    }),
    updateCustomerBeneficiary: builder.mutation({
      query: (data) => ({
        url: `/${data.customerId}/beneficiaries/${data.beneficiaryId}`,
        method: 'PUT',
        body: data.payload,
      }),
    }),
    deleteCustomerBeneficiary: builder.mutation({
      query: (data) => ({
        url: `/${data.customerId}/beneficiaries/${data.beneficiaryId}`,
        method: 'DELETE',
      }),
    }),
  })
});

export const {
  useFetchCustomerBeneficiariesQuery,
  useCreateCustomerBeneficiaryMutation,
  useUpdateCustomerBeneficiaryMutation,
  useDeleteCustomerBeneficiaryMutation,
} = beneficiariesApi;
