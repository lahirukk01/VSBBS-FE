import {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

import useCreateLoan from '~/pages/customer-loans/useCreateLoan.ts';
import {TLoan} from '~/pages/customer-loans/types.ts';
import useUpdateLoan from '~/pages/customer-loans/useUpdateLoan.ts';
import Col from 'react-bootstrap/Col';
import useDeleteLoan from '~/pages/customer-loans/useDeleteLoan.ts';

type TCreateLoanModalProps = {
  onClose: () => void;
  onSubmit: () => void;
  customerId: number;
  loan: TLoan | null;
};

const LoanModal: React.FC<TCreateLoanModalProps> = ({ onClose, onSubmit, customerId, loan }) => {
  const [loanAmount, setLoanAmount] = useState<number>(loan?.amount || 0);
  const [numberOfEmis, setNumberOfEmis] = useState<number>(loan?.numberOfEmis || 1);
  const [purpose, setPurpose] = useState<string>(loan?.purpose || '');

  const {
    createCustomerLoan, errorMessage, isLoading
  } = useCreateLoan({ onSubmit, onClose });
  const {
    updateCustomerLoan,
    isLoading: isUpdateLoading,
    errorMessage: updateErrorMessage,
  } = useUpdateLoan({ onSubmit, onClose });

  const {
    deleteCustomerLoan,
    deleteErrorMessage,
    isLoadingDelete,
  } = useDeleteLoan({ onSubmit, onClose });

  const handleSubmit = async () => {
    const fetchArgs = {
      pathParams: {
        customerId, loanId: loan ? loan.id : 0
      },
      payload: {
        amount: loanAmount, numberOfEmis, purpose
      }
    };

    if (loan) {
      await updateCustomerLoan(fetchArgs).unwrap();
    } else {
      await createCustomerLoan(fetchArgs).unwrap();
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.round(100 * parseFloat(e.target.value)) / 100;
    setLoanAmount(value);
  };

  const handleLoanDelete = async () => {
    if (window.confirm('Are you sure you want to delete this loan?')) {
      await deleteCustomerLoan({
        pathParams: { customerId, loanId: loan?.id || 0 }
      }).unwrap();
    }
  };

  const loanReviewed = loan?.status === 'APPROVED' || loan?.status === 'REJECTED';
  const disableSubmit = loanAmount < 1 || numberOfEmis < 1 || !purpose ||
    isLoading || loanReviewed || isUpdateLoading;
  const finalErrorMessage = errorMessage || updateErrorMessage || deleteErrorMessage;

  let title = 'Create Loan';
  if (loan) {
    if (loanReviewed) {
      title = 'Loan Details';
    } else {
      title = 'Update or Delete Loan';
    }
  }

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <p>Interest Rate: 4%</p>
        </Row>
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
                readOnly={loanReviewed}
              />
            </Form.Group>
            <Form.Group controlId="formEmis">
              <Form.Label>Number of EMIs</Form.Label>
              <Form.Control
                type="number"
                step={1}
                placeholder="Enter number of EMIs"
                value={numberOfEmis}
                min={1}
                max={120}
                readOnly={loanReviewed}
                onChange={(e) => setNumberOfEmis(+e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPPurpose">
              <Form.Label>Purpose of Loan</Form.Label>
              <Form.Control
                type="test"
                value={purpose}
                readOnly={loanReviewed}
                onChange={(e) => setPurpose(e.target.value)}
              />
            </Form.Group>
            {loanReviewed && (
              <Form.Group controlId="formPPurpose">
                <Form.Label>Loan Status</Form.Label>
                <Form.Control
                  type="test"
                  value={loan?.status}
                  readOnly={loanReviewed}
                  onChange={(e) => setPurpose(e.target.value)}
                />
              </Form.Group>
            )}
          </Form>
        </Row>
        <Row>
          <p className="text-danger">{finalErrorMessage}</p>
        </Row>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        {!loanReviewed && (
          <Row className="w-100">
            <Col>
              <Button
              disabled={disableSubmit}
              variant="primary"
              onClick={handleSubmit}>
                {loan ? 'Update' : 'Create'}
            </Button>
            </Col>
            <Col>
              {loan?.status === 'PENDING' &&
                <Button
                  disabled={isLoadingDelete}
                  onClick={handleLoanDelete}
                  className="mx-2" variant="danger">Cancel Loan</Button>}
            </Col>
          </Row>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default LoanModal;
