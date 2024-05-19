import {useUpdateCustomerLoanMutation} from '~/store/CustomerLoansApiSlice.ts';
import {useEffect, useState} from 'react';
import {TErrorResponse} from '~/types/common.ts';

type TUseCreateCustomerArgs = {
  onSubmit: () => void;
  onClose: () => void;
};

const useUpdateLoan = ({ onSubmit, onClose }: TUseCreateCustomerArgs) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [
    updateCustomerLoan,
    { isSuccess, error, isLoading},
  ] = useUpdateCustomerLoanMutation();

  useEffect(() => {
    if (isSuccess) {
      onSubmit();
      onClose();
    } else if (error) {
      const message = (error as TErrorResponse).data.error.message || 'Error occurred while creating customer loan';
      setErrorMessage(message);
    }
  }, [isSuccess, error, onSubmit, onClose]);

  return {
    isLoading,
    updateCustomerLoan,
    errorMessage
  };
};

export default useUpdateLoan;
