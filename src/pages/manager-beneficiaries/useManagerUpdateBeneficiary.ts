import {useUpdateManagerBeneficiaryMutation} from '~/store/ManagerBeneficiariesApiSlice.ts';
import {useEffect, useState} from 'react';
import {TErrorResponse} from '~/types/common.ts';

type TUseManagerUpdateBeneficiaryArgs = {
  onSubmit: () => void;
  onClose: () => void;
};

const useManagerUpdateBeneficiary = ({ onSubmit, onClose }: TUseManagerUpdateBeneficiaryArgs) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [
    updateManagerBeneficiary, {isLoading, error, isSuccess}
  ] = useUpdateManagerBeneficiaryMutation();

  useEffect(() => {
    if (isSuccess) {
      onSubmit();
      onClose();
    } else if (error) {
      const message = (error as TErrorResponse).data.error.message || 'Failed to perform action';
      setErrorMessage(message);
    }
  }, [isSuccess, onClose, error, onSubmit]);

  return {
    errorMessage,
    isLoading,
    updateManagerBeneficiary,
  };
};

export default useManagerUpdateBeneficiary;
