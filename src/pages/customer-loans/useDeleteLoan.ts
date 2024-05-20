import {useEffect, useState} from 'react';
import {useDeleteCustomerLoanMutation} from '~/store/CustomerLoansApiSlice.ts';
import {TErrorResponse} from '~/types/common.ts';

type TUseDeleteCustomerLoanArgs = {
  onSubmit: () => void;
  onClose: () => void;
};

const useDeleteLoan = ({ onSubmit, onClose }: TUseDeleteCustomerLoanArgs) => {
  const [deleteErrorMessage, setDeleteErrorMessage] = useState<string>('');

  const [
    deleteCustomerLoan,
    { isSuccess, error, isLoading: isLoadingDelete},
  ] = useDeleteCustomerLoanMutation();

  useEffect(() => {
    if (isSuccess) {
      onSubmit();
      onClose();
    } else if (error) {
      const message = (error as TErrorResponse).data.error.message || 'Error occurred while creating customer loan';
      setDeleteErrorMessage(message);
    }
  }, [isSuccess, error, onSubmit, onClose]);

  return {
    isLoadingDelete,
    deleteCustomerLoan,
    deleteErrorMessage
  };
};

export default useDeleteLoan;
