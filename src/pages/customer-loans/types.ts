export type TLoanDecision = 'APPROVED' | 'REJECTED';
export type TLoanStatus = 'PENDING' & TLoanDecision;
export type TLoanPaymentStatus = 'PENDING' | 'NA' | 'PAID' | 'OVERDUE';

export type TLoanBase = {
  amount: number;
  purpose: string;
  numberOfEmis: number;
};

export type TLoan = {
  id: number;
  customerId: number;
  status: TLoanStatus;
  paymentStatus: TLoanPaymentStatus;
  paidEmis: number;
  creditRating: number | null;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
} & TLoanBase;

export type TLoansFetchResponse = {
  data: {
    loans: TLoan[];
  }
};

export type TCreateCustomerLoanFetchArgs = {
  pathParams: {
    customerId: number;
  };
  payload: TLoanBase;
};

export type TUpdateCustomerLoanFetchArgs = {
  pathParams: {
    loanId: number;
  };
} & TCreateCustomerLoanFetchArgs;
