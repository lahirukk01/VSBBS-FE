import {TLoanDecision} from '~/pages/customer-loans/types.ts';

export type TCreditScoreFetchResponse = {
  data: {
    creditRating: number;
  }
};

export type TLoanDecisionSubmitFetchArgs = {
  pathParams: {
    loanId: number;
  };
  payload: {
    status: TLoanDecision;
    remarks: string;
    creditRating: number;
  };
};
