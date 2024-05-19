import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useState} from 'react';
import Row from 'react-bootstrap/Row';
import useCreateCustomer from '~/pages/customer-loans/useCreateCustomer.ts';

type TCreateLoanModalProps = {
  onClose: () => void;
  onSubmit: () => void;
  customerId: number;
};

const CreateLoanModal: React.FC<TCreateLoanModalProps> = ({ onClose, onSubmit, customerId }) => {
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [numberOfEmis, setNumberOfEmis] = useState<number>(1);
  const [purpose, setPurpose] = useState<string>('');

  const { createCustomerLoan, errorMessage, isLoading } = useCreateCustomer({
    onSubmit,
    onClose
  });

  const handleSubmit = async () => {
    await createCustomerLoan({
      pathParams: {
        customerId,
      },
      payload: {
        amount: loanAmount,
        numberOfEmis,
        purpose
      }
    }).unwrap();
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.round(100 * parseFloat(e.target.value)) / 100;
    setLoanAmount(value);
  };

  const disableSubmit = loanAmount < 1 || numberOfEmis < 1 || !purpose || isLoading;

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Loan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Loan Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter loan amount"
                min={10}
                value={loanAmount || ''}
                onChange={handleAmountChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Number of EMIs</Form.Label>
              <Form.Control
                type="number"
                step={1}
                placeholder="Enter number of EMIs"
                value={numberOfEmis}
                min={1}
                max={120}
                onChange={(e) => setNumberOfEmis(+e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Purpose of Payments</Form.Label>
              <Form.Control
                type="test"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Row>
        <Row>
          <p className="text-danger">{errorMessage}</p>
        </Row>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button
          disabled={disableSubmit}
          variant="primary"
          onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateLoanModal;
