import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {addAuthHeader, buildBaseUrl} from '~/store/helpers.ts';
import {TManagerBeneficiaryProcessRequest} from '~/pages/manager-beneficiaries/types.ts';

export const managerBeneficiariesApi = createApi({
  reducerPath: 'managerBeneficiariesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: buildBaseUrl('beneficiary-service/'),
    prepareHeaders: addAuthHeader,
  }),
  endpoints: (builder) => ({
    fetchManagerBeneficiaries: builder.query({
      query: () => '/beneficiaries',
    }),
    updateManagerBeneficiary: builder.mutation({
      query: (data: TManagerBeneficiaryProcessRequest) => ({
        url: `/beneficiaries/${data.beneficiaryId}`,
        method: 'PUT',
        body: data.payload,
      }),
    }),
  }),
});

export const {
  useFetchManagerBeneficiariesQuery,
  useUpdateManagerBeneficiaryMutation,
} = managerBeneficiariesApi;
