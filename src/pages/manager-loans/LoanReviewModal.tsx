import {TLoan, TLoanDecision} from '~/pages/customer-loans/types.ts';
import {TUserFetchResponseSuccess, useFetchUserQuery} from '~/store/UsersApiSlice.ts';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {Form, InputGroup, Spinner} from 'react-bootstrap';
import {useState} from 'react';
import {useManagerFetchCreditScoreQuery} from '~/store/ManagerLoansApiSlice.ts';
import {TErrorResponse} from '~/types/common.ts';
import {TCreditScoreFetchResponse, TLoanDecisionSubmitFetchArgs} from '~/pages/manager-loans/types.ts';
import useManagerLoanDecisionSubmit from '~/pages/manager-loans/useManagerLoanDecisionSubmit.ts';

type TLoanReviewModalProps = {
  loan: TLoan;
  onClose: () => void;
  onSubmit: () => void;
};

type TModalBodyProps = {
  loan: TLoan;
  isLoading: boolean;
  data: TUserFetchResponseSuccess | null;
  error: unknown;
  creditRating: number | null;
};

const ModalBody: React.FC<TModalBodyProps> = ({ loan, isLoading, data, error, creditRating }) => {
  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    console.error('Error when fetching user data: ', error);
    return (
      <Col>
        <p className="text-danger">Error occurred while fetching customer data</p>
      </Col>
    );
  } else {
    const customer = (data as TUserFetchResponseSuccess).data.user;
    const customerName = `${customer.firstName} ${customer.lastName}`;

    return (
      <Col>
        <Table striped bordered hover>
          <tbody>
          <tr>
            <td>Loan Amount</td>
            <td>{loan.amount}</td>
          </tr>
          <tr>
            <td>Number of EMIs</td>
            <td>{loan.numberOfEmis}</td>
          </tr>
          <tr>
            <td>Purpose</td>
            <td>{loan.purpose}</td>
          </tr>
          <tr>
            <td>Customer</td>
            <td>{customerName}</td>
          </tr>
          <tr>
            <td>Customer Mobile</td>
            <td>{customer.mobile}</td>
          </tr>
          <tr>
            <td>Customer Email</td>
            <td>{customer.email}</td>
          </tr>
          <tr>
            <td>Credit Score</td>
            <td>{loan.creditRating || creditRating || 'On Request'}</td>
          </tr>
          </tbody>
        </Table>
      </Col>
    );
  }
};

const LoanReviewModal = ({ loan, onClose, onSubmit }: TLoanReviewModalProps) => {
  const [fetchCreditScore, setFetchCreditScore] = useState<boolean>(false);
  const [
    managerDecision,
    setManagerDecision
  ] = useState<TLoanDecision>(loan.status === 'PENDING' ? 'APPROVED' : loan.status);
  const [remarks, setRemarks] = useState<string>(loan.remarks || '');

  const { data, isLoading, error } = useFetchUserQuery(loan.customerId);
  const {
    data: creditScoreData, isLoading: creditScoreIsLoading,
    error: creditScoreError
  } = useManagerFetchCreditScoreQuery(loan.customerId, {
    skip: !fetchCreditScore
  });

  const {
    errorMessage,
    isLoading: isLoadingManagerDecisionSubmit,
    managerLoanDecisionSubmit
  } = useManagerLoanDecisionSubmit({
    onSubmit,
    onClose
  });

  const handleSubmitDecision = async () => {
    const loanDecisionSubmitFetchArgs: TLoanDecisionSubmitFetchArgs = {
      pathParams: {
        loanId: loan.id
      },
      payload: {
        status: managerDecision,
        remarks,
        creditRating: creditScoreData ? (creditScoreData as TCreditScoreFetchResponse).data.creditRating : 0
      },
    };

    await managerLoanDecisionSubmit(loanDecisionSubmitFetchArgs).unwrap();
  };

  const handleFetchCreditScore = () => {
    setFetchCreditScore(true);
  };

  let creditScoreFetchErrorMessage = '';
  if (creditScoreError) {
    creditScoreFetchErrorMessage = (creditScoreError as TErrorResponse).data.error.message ||
      'Error occurred while fetching credit score';
  }

  const creditRating = creditScoreData ?
    (creditScoreData as TCreditScoreFetchResponse).data.creditRating : loan.creditRating;
  const finalErrorMessage = errorMessage || creditScoreFetchErrorMessage;
  const disableSubmit = isLoadingManagerDecisionSubmit || !creditRating;

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Review Loan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <ModalBody
            loan={loan} isLoading={isLoading} data={data}
            error={error} creditRating={creditRating}
          />
        </Row>
        <Row>
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Select Decision</InputGroup.Text>
                <Form.Select
                  value={managerDecision}
                  disabled={loan.status !== 'PENDING'}
                  onChange={(e) => setManagerDecision(e.target.value as TLoanDecision)}
                  aria-label="Default select example">
                  <option value="APPROVED">Approve</option>
                  <option value="REJECTED">Reject</option>
                </Form.Select>
              </InputGroup>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <Form.Control
                type="text" value={remarks}
                disabled={loan.status !== 'PENDING'}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Remarks" />
            </Col>
          </Row>
        </Row>
        <Row>
          {loan.status === 'PENDING' && <>
            <Col className="d-flex justify-content-center">
              <Button
                disabled={creditScoreIsLoading || !!creditRating}
                variant="info" onClick={handleFetchCreditScore}>
                Credit Score
                {creditScoreIsLoading && (
                  <Spinner animation="grow" />
                )}
              </Button>
            </Col>
            <Col className="d-flex justify-content-center">
              <Button
                disabled={disableSubmit}
                onClick={handleSubmitDecision}>Submit</Button>
            </Col>
          </>}
        </Row>
        <Row>
          <p className="text-danger">{finalErrorMessage}</p>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default LoanReviewModal;
