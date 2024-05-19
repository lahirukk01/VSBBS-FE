export type TLoanStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
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
  createdAt: string;
  updatedAt: string;
} & TLoanBase;

export type TCustomerLoansFetchResponse = {
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
