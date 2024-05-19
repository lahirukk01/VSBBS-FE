export type TManagerBeneficiaryProcessRequest = {
  beneficiaryId: number;
  payload: {
    status: string;
    comments: string;
  };
};
