export type TBeneficiaryBase = {
  name: string;
  email: string;
  accountId: number;
  accountIfscCode: string;
};

export type TBeneficiary = {
  id: number;
  customerId: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  comments: string;
  createdAt: string;
  updatedAt: string;
} & TBeneficiaryBase;

export type TFetchCustomerBeneficiariesResponse = {
  data: {
    beneficiaries: TBeneficiary[]
  }
};

export type TCreateBeneficiaryRequest = {

};

export type TModalType = 'Update' | 'Delete' | 'Create';
