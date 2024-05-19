import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import {useOutletContext} from 'react-router-dom';

import {TOutletContext} from '~/types/common.ts';
import Row from 'react-bootstrap/Row';
import {useFetchManagerLoansQuery} from '~/store/ManagerLoansApiSlice.ts';
import ErrorOccurred from '~/pages/ErrorOccurred.tsx';
import LoadingOverlay from '~/components/layout/LoadingOverlay.tsx';
import {TLoan, TLoansFetchResponse} from '~/pages/customer-loans/types.ts';
import Button from 'react-bootstrap/Button';
import {useState} from 'react';
import LoanReviewModal from '~/pages/manager-loans/LoanReviewModal.tsx';

const ManagerLoans = () => {
  const { user } = useOutletContext<TOutletContext>();

  const [selectedLoan, setSelectedLoan] = useState<TLoan | null>(null);

  const { data, isLoading, error, refetch } = useFetchManagerLoansQuery(user.id);

  if (isLoading) return <LoadingOverlay show={isLoading} />;

  if (error) {
    console.error('Error when fetching user data: ', error);
    return <ErrorOccurred />;
  }

  const loans = data ? (data as TLoansFetchResponse).data.loans : [];

  return (
    <Container>
      <Row>
        <h3 className="my-3">Manager Loans</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Loan Amount</th>
              <th>Number of EMIs</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.amount}</td>
                <td>{loan.numberOfEmis}</td>
                <td>{loan.status}</td>
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
      {selectedLoan &&
        <LoanReviewModal
          onClose={() => setSelectedLoan(null)}
          onSubmit={refetch}
          loan={selectedLoan}
        />}
    </Container>
  );
};

export default ManagerLoans;
