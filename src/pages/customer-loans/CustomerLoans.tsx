import {useOutletContext} from 'react-router-dom';
import {TOutletContext} from '~/types/common.ts';
import {useFetchCustomerLoansQuery} from '~/store/CustomerLoansApiSlice.ts';
import LoadingOverlay from '~/components/layout/LoadingOverlay.tsx';
import ErrorOccurred from '~/pages/ErrorOccurred.tsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import {TLoan, TLoansFetchResponse} from '~/pages/customer-loans/types.ts';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import {useState} from 'react';
import LoanModal from '~/pages/customer-loans/LoanModal.tsx';

const CustomerLoans = () => {
  const { user } = useOutletContext<TOutletContext>();

  const [showCreateLoanModal, setShowCreateLoanModal] = useState<boolean>(false);
  const [selectedLoan, setSelectedLoan] = useState<TLoan | null>(null);

  const { data, isLoading, error, refetch } = useFetchCustomerLoansQuery(user.id);

  if (isLoading) return <LoadingOverlay show={isLoading} />;

  if (error) {
    console.error('Error when fetching user data: ', error);
    return <ErrorOccurred />;
  }

  const loans = data ? (data as TLoansFetchResponse).data.loans : [];

  return (
    <Container>
      <Row>
        <h3 className="my-3">Customer Loans</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Loan Amount</th>
              <th>Number of EMIs</th>
              <th>Status</th>
              <th>Payment Status</th>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.amount}</td>
                <td>{loan.numberOfEmis}</td>
                <td>{loan.status}</td>
                <td>{loan.paymentStatus}</td>
                <td>
                  <Button onClick={() => setSelectedLoan(loan)}>
                    {loan.status === 'PENDING' ? 'Review' : 'View'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <Row>
        <Col>
          <Button
            variant="primary"
            onClick={() => setShowCreateLoanModal(true)}
          >Create Loan</Button>
        </Col>
      </Row>
      {showCreateLoanModal && (
        <LoanModal
          onClose={() => setShowCreateLoanModal(false)}
          onSubmit={refetch}
          customerId={user.id}
          loan={null}
        />
      )}
      {selectedLoan && (
        <LoanModal
          onClose={() => setSelectedLoan(null)}
          onSubmit={refetch}
          customerId={user.id}
          loan={selectedLoan}
        />
      )}
    </Container>
  );
};

export default CustomerLoans;
