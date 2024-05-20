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

export type TCreateCustomerLoanPaymentFetchArgs = {
  pathParams: {
    customerId: number;
    loanId: number;
  };
  payload: {
    paymentMethod: TPaymentMethod;
    cardNumber?: string;
    cardHolderName?: string;
    cardExpiry?: string;
    cardCvv?: string;
    upiId?: string;
    savingsAccountId?: number;
  };
};

export type TUpdateCustomerLoanFetchArgs = {
  pathParams: {
    loanId: number;
  };
} & TCreateCustomerLoanFetchArgs;

export type TDeleteCustomerLoanFetchArgs = {
  pathParams: {
    loanId: number;
    customerId: number;
  };
};

export type TPaymentMethod = 'SAVINGS_ACCOUNT' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'UPI';

export type TCardField = 'cardNumber' | 'expiryDate' | 'cvv' | 'cardHolderName';

export type TCardDetails = Record<TCardField, string>;
