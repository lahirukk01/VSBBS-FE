import {useOutletContext} from 'react-router-dom';
import {TOutletContext} from '~/types/common.ts';
import {useFetchCustomerLoansQuery} from '~/store/CustomerLoansApiSlice.ts';
import LoadingOverlay from '~/components/layout/LoadingOverlay.tsx';
import ErrorOccurred from '~/pages/ErrorOccurred.tsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import {TCustomerLoansFetchResponse} from '~/pages/customer-loans/types.ts';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import {useState} from 'react';
import CreateLoanModal from '~/pages/customer-loans/CreateLoanModal.tsx';

const CustomerLoans = () => {
  const { user } = useOutletContext<TOutletContext>();

  const [showCreateLoanModal, setShowCreateLoanModal] = useState<boolean>(false);

  const { data, isLoading, error, refetch } = useFetchCustomerLoansQuery(user.id);

  if (isLoading) return <LoadingOverlay show={isLoading} />;

  if (error) {
    console.error('Error when fetching user data: ', error);
    return <ErrorOccurred />;
  }

  const loans = data ? (data as TCustomerLoansFetchResponse).data.loans : [];
  console.log('data: ', data);
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
        <CreateLoanModal
          onClose={() => setShowCreateLoanModal(false)}
          onSubmit={refetch}
          customerId={user.id}
        />
      )}
    </Container>
  );
};

export default CustomerLoans;
