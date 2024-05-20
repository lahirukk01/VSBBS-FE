import {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Form, InputGroup } from 'react-bootstrap';

import {
  TCardDetails,
  TCardField,
  TLoan,
  TPaymentMethod
} from '~/pages/customer-loans/types.ts';
import CardPayment from '~/pages/customer-loans/CardPayment.tsx';
import {buildLoanPaymentSubmitFetchArgs, cardDetailsValidationErrors} from '~/pages/customer-loans/helpers.ts';
import LoanPaymentSummary from '~/pages/customer-loans/LoanPaymentSummary.tsx';
import {TAccount} from '~/pages/customer-accounts/types.ts';
import useCreateLoanPayment from '~/pages/customer-loans/useCreateLoanPayment.ts';


type TLoanPaymentModalProps = {
  loan: TLoan;
  savingsAccount: TAccount;
  onClose: () => void;
  onSubmit: () => void;
};

const initCardDetails: TCardDetails = {
  cardHolderName: '',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
};

const LoanPaymentModal = ({ loan, onClose, onSubmit, savingsAccount }: TLoanPaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<TPaymentMethod | ''>('');
  const [cardDetails, setCardDetails] = useState<TCardDetails>(initCardDetails);
  const [upiPin, setUpiPin] = useState<string>('');

  const {
    createCustomerLoanPayment,
    errorMessage: createLoanPaymentErrorMessage,
    isLoading: isCreatingLoanPayment
  } = useCreateLoanPayment({onSubmit, onClose});

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as (TPaymentMethod | '');
    setPaymentMethod(value);
    setCardDetails(initCardDetails);
  };

  const handleCardDetailsChange = (fieldName: TCardField, value: string) => {
    setCardDetails((prev) => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleSubmit = async () => {
    const createPaymentFetchArgs = buildLoanPaymentSubmitFetchArgs({
      loan, paymentMethod: paymentMethod as TPaymentMethod,
      cardDetails, upiPin, savingsAccount
    });

    await createCustomerLoanPayment(createPaymentFetchArgs).unwrap();
  };

  const isCardPayment = paymentMethod === 'CREDIT_CARD' || paymentMethod === 'DEBIT_CARD';
  const cardError = isCardPayment && cardDetailsValidationErrors(cardDetails);
  const invalidUpiPin = paymentMethod === 'UPI' && !/^(?:\d{4}|\d{6})$/g.test(upiPin);
  const disableSubmit = (isCardPayment && !!cardError) ||
    (paymentMethod === 'UPI' && invalidUpiPin) || !paymentMethod || isCreatingLoanPayment;
  const finalErrorMessage = cardError || createLoanPaymentErrorMessage || '';

  let PaymentMethodComponent = null;
  if (isCardPayment) {
    PaymentMethodComponent = <CardPayment cardDetails={cardDetails} onChange={handleCardDetailsChange} />;
  } else if (paymentMethod === 'UPI') {
    PaymentMethodComponent = (
      <InputGroup className="mb-3">
        <InputGroup.Text>UPI PIN</InputGroup.Text>
        <Form.Control
          type="text"
          maxLength={6}
          placeholder="Enter UPI ID"
          value={upiPin}
          onChange={(e) => setUpiPin(e.target.value)}
        />
      </InputGroup>
    );
  }

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Loan Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <LoanPaymentSummary loan={loan} />
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Select Payment Method</InputGroup.Text>
              <Form.Select
                onChange={handlePaymentMethodChange}
                aria-label="payment-method-select" value={paymentMethod}
              >
                <option value="">Select</option>
                <option value="SAVINGS_ACCOUNT">Savings Account</option>
                <option value="CREDIT_CARD">Credit Card</option>
                <option value="DEBIT_CARD">Debit Card</option>
                <option value="UPI">UPI</option>
              </Form.Select>
            </InputGroup>
            {PaymentMethodComponent}
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-danger">{finalErrorMessage}</p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button
          disabled={disableSubmit}
          variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoanPaymentModal;
