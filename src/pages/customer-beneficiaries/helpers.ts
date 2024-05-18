import {TBeneficiaryBase} from '~/pages/customer-beneficiaries/types.ts';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateName = (previousName: string, newName: string) => {
  const regex = /^[a-zA-Z\s]*$/;

  return regex.test(newName) ? newName : previousName;
};

export const beneficiaryModalInputValidator = ({
   name, email, accountId, accountIfscCode
}: TBeneficiaryBase) => {
    if (!/^[a-zA-Z\s]*$/g.test(name)) {
        return 'Name should contain only alphabets and spaces';
    }

    if (!/^[a-zA-Z0-9]*$/g.test(accountIfscCode)) {
        return 'IFSC code should contain only alphabets and numbers';
    }

    if (accountId <= 0) {
        return 'Account ID should be a positive number';
    }

    if (!emailRegex.test(email)) {
        return 'Invalid email address';
    }

    return '';
};
