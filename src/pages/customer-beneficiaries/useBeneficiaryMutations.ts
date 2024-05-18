import {
  useCreateCustomerBeneficiaryMutation, useDeleteCustomerBeneficiaryMutation,
  useUpdateCustomerBeneficiaryMutation
} from '~/store/BeneficiariesApiSlice.ts';
import {TErrorResponse} from '~/types/common.ts';
import {useEffect} from 'react';

type TUseBeneficiaryMutationsArgs = {
  onSubmit: () => void;
  onClose: () => void;
};

const useBeneficiaryMutations = ({ onSubmit, onClose }: TUseBeneficiaryMutationsArgs) => {
  const [
    createCustomerBeneficiary,
    {isLoading: isLoadingCreation, error: createError, isSuccess: createSuccess}
  ] = useCreateCustomerBeneficiaryMutation();
  const [
    updateCustomerBeneficiary,
    {isLoading: isLoadingUpdate, error: updateError, isSuccess: updateSuccess}
  ] = useUpdateCustomerBeneficiaryMutation();
  const [
    deleteCustomerBeneficiary,
    {isLoading: isLoadingDelete, error: deleteError, isSuccess: deleteSuccess}
  ] = useDeleteCustomerBeneficiaryMutation();

  const isSuccess = createSuccess || updateSuccess || deleteSuccess;

  useEffect(() => {

    if (isSuccess) {
      onSubmit();
      onClose();
    }
  }, [isSuccess, onSubmit, onClose]);

  const error = createError || updateError || deleteError;

  let errorMessage = '';

  if (error) {
    errorMessage = (error as TErrorResponse).data.error.message || 'Failed to perform action';
  }

  const isLoading = isLoadingCreation || isLoadingUpdate || isLoadingDelete;

  return {
    createCustomerBeneficiary,
    updateCustomerBeneficiary,
    deleteCustomerBeneficiary,
    errorMessage,
    isLoading,
  };
};

export default useBeneficiaryMutations;
