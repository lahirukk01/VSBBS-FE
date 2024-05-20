import {useCreateCustomerLoanPaymentMutation} from '~/store/CustomerLoansApiSlice.ts';
import {useEffect, useState} from 'react';
import {TErrorResponse} from '~/types/common.ts';

type TUseCreateCustomerArgs = {
  onSubmit: () => void;
  onClose: () => void;
};

const useCreateLoanPayment = ({ onSubmit, onClose }: TUseCreateCustomerArgs) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [
    createCustomerLoanPayment,
    { isSuccess, error, isLoading},
  ] = useCreateCustomerLoanPaymentMutation();

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
    createCustomerLoanPayment,
    errorMessage
  };
};

export default useCreateLoanPayment;
