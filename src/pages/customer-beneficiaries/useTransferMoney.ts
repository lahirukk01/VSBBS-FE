import {useTransferMoneyMutation} from '~/store/AccountsApiSlice.ts';
import {useEffect, useState} from 'react';
import {TErrorResponse} from '~/types/common.ts';

type TUseTransferMoneyArgs = {
  onClose: () => void;
  onSubmit: () => void;
};

const useTransferMoney = ({ onClose, onSubmit }: TUseTransferMoneyArgs) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [transferMoney, { isLoading, error, isSuccess }] = useTransferMoneyMutation();

  useEffect(() => {
    if (isSuccess) {
      onSubmit();
      onClose();
    } else if (error) {
      const errorMessage = (error as TErrorResponse).data.error.message || 'Error occurred while transferring money';
      setErrorMessage(errorMessage);
    }
  }, [error, onClose, isSuccess, onSubmit]);

  return {
    transferMoney,
    isLoading,
    errorMessage
  };
};

export default useTransferMoney;
