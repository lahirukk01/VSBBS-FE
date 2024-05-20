import {useCreateCustomerLoanPaymentMutation} from '~/store/CustomerLoansApiSlice.ts';
import {useEffect, useState} from 'react';
import {TErrorResponse} from '~/types/common.ts';
import {TPaymentMethod} from '~/pages/customer-loans/types.ts';

type TUseCreateCustomerArgs = {
  onSubmit: (paymentMethod: TPaymentMethod) => void;
  onClose: () => void;
  paymentMethod: TPaymentMethod;
};

const useCreateLoanPayment = ({ onSubmit, onClose, paymentMethod }: TUseCreateCustomerArgs) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [
    createCustomerLoanPayment,
    { isSuccess, error, isLoading},
  ] = useCreateCustomerLoanPaymentMutation();

  useEffect(() => {
    if (isSuccess) {
      onSubmit(paymentMethod);
      onClose();
    } else if (error) {
      const message = (error as TErrorResponse).data.error.message || 'Error occurred while creating customer loan';
      setErrorMessage(message);
    }
  }, [isSuccess, error, onSubmit, onClose, paymentMethod]);

  return {
    isLoading,
    createCustomerLoanPayment,
    errorMessage
  };
};

export default useCreateLoanPayment;
