export type TAccount = {
  id: number;
  customerId: number;
  accountType: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
  transactions: TTransaction[] | null;
};

export type TAccountFetchResponse = {
  data: {
    accounts: TAccount[];
  }
};

export type TAccountDetailsProps = {
  account: TAccount;
  customerId: number;
};

export type TTransaction = {
  id: number;
  transactionType: string;
  amount: number;
  description: string;
  transactionMethod: string;
  endBankIfsc: string;
  endBankAccountId: number;
  createdAt: string;
};

export type TFetchAccountTransactionsResponse = {
  data: {
    transactions: TTransaction[];
  }
}
