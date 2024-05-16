import {TFetchAccountsRequestParams} from '~/store/AccountsApiSlice.ts';

export const updateFetchAccountTransactionsState = ({
  prev, onDate, fromDate, toDate, page
}: {
  prev: TFetchAccountsRequestParams,
  onDate: string,
  fromDate: string,
  toDate: string,
  page: number
}) => {
  return {
    ...prev,
    queryParams: {
      onDate: onDate || '',
      fromDate: fromDate || '',
      toDate: toDate || '',
      page,
    }
  };
};
