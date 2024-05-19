export type TBeneficiaryBase = {
  name: string;
  email: string;
  accountId: number;
  accountIfscCode: string;
};

export type TBeneficiaryStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type TBeneficiary = {
  id: number;
  customerId: number;
  status: TBeneficiaryStatus;
  comments: string | null;
  createdAt: string;
  updatedAt: string;
} & TBeneficiaryBase;

export type TFetchBeneficiariesResponse = {
  data: {
    beneficiaries: TBeneficiary[]
  }
};

export type TModalType = 'Update' | 'Delete' | 'Create';
