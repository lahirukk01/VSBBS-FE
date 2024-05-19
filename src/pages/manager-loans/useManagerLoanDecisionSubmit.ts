import {useEffect, useState} from 'react';
import {useManagerLoanDecisionSubmitMutation} from '~/store/ManagerLoansApiSlice.ts';
import {TErrorResponse} from '~/types/common.ts';

type TUseManagerLoanDecisionSubmitArgs = {
  onSubmit: () => void;
  onClose: () => void;
};

const useManagerLoanDecisionSubmit = ({ onSubmit, onClose }: TUseManagerLoanDecisionSubmitArgs) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [managerLoanDecisionSubmit, { isLoading, error, isSuccess }] = useManagerLoanDecisionSubmitMutation();

  useEffect(() => {
    if (isSuccess) {
      onSubmit();
      onClose();
    } else if (error) {
      const errorMessage = (error as TErrorResponse).data.error.message ||
        'Error occurred while submitting loan decision';
      setErrorMessage(errorMessage);
    }
  }, [error, onClose, isSuccess, onSubmit]);

  return {
    managerLoanDecisionSubmit,
    isLoading,
    errorMessage
  };
};

export default useManagerLoanDecisionSubmit;
