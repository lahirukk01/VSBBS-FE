import {
  TCardDetails,
  TCreateCustomerLoanPaymentFetchArgs,
  TLoan,
  TPaymentMethod
} from '~/pages/customer-loans/types.ts';
import {TAccount} from '~/pages/customer-accounts/types.ts';

export const cardNumberRegex = /^[0-9]{16}$/;
export const expiryDateRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
export const cvvRegex = /^[0-9]{3}$/;

export const cardDetailsValidationErrors = (cardDetails: TCardDetails) => {
  if (!cardNumberRegex.test(cardDetails.cardNumber)) {
    return 'Invalid card number';
  }

  if (!expiryDateRegex.test(cardDetails.expiryDate)) {
    return 'Invalid expiry date';
  }

  if (!cvvRegex.test(cardDetails.cvv)) {
    return 'Invalid CVV';
  }

  return null;
};

type TBuidLoanPaymentSubmitFetchArgs = {
  loan: TLoan;
  paymentMethod: TPaymentMethod;
  cardDetails: TCardDetails;
  upiPin: string;
  savingsAccount: TAccount;
};


export const buildLoanPaymentSubmitFetchArgs = ({
  loan, paymentMethod, cardDetails, upiPin, savingsAccount
}: TBuidLoanPaymentSubmitFetchArgs) => {
  const createPaymentFetchArgs: TCreateCustomerLoanPaymentFetchArgs = {
    pathParams: {
      customerId: loan.customerId,
      loanId: loan.id
    },
    payload: {
      paymentMethod: paymentMethod as TPaymentMethod,
    }
  };

  if (paymentMethod === 'UPI') {
    createPaymentFetchArgs.payload.upiId = upiPin;
  } else if (paymentMethod === 'SAVINGS_ACCOUNT') {
    createPaymentFetchArgs.payload.savingsAccountId = savingsAccount.id;
  } else if (paymentMethod === 'CREDIT_CARD' || paymentMethod === 'DEBIT_CARD') {
    createPaymentFetchArgs.payload = {
      ...createPaymentFetchArgs.payload,
      cardHolderName: cardDetails.cardHolderName,
      cardNumber: cardDetails.cardNumber,
      cardExpiry: cardDetails.expiryDate,
      cardCvv: cardDetails.cvv,
    };
  }

  return createPaymentFetchArgs;
};
