import {useState} from 'react';
import {useOutletContext} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import {TOutletContext} from '~/types/common.ts';
import {useFetchCustomerLoansQuery} from '~/store/CustomerLoansApiSlice.ts';
import LoadingOverlay from '~/components/layout/LoadingOverlay.tsx';
import ErrorOccurred from '~/pages/ErrorOccurred.tsx';
import {TLoan, TLoansFetchResponse} from '~/pages/customer-loans/types.ts';
import LoanModal from '~/pages/customer-loans/LoanModal.tsx';
import LoanPaymentModal from '~/pages/customer-loans/LoanPaymentModal.tsx';
import {useFetchAccountsQuery} from '~/store/AccountsApiSlice.ts';
import {TAccount} from '~/pages/customer-accounts/types.ts';

type TLoanModalType = 'CREATE' | 'UPDATE' | 'PAYMENT';

const CustomerLoans = () => {
  const { user } = useOutletContext<TOutletContext>();

  const [modalType, setModalType] = useState<TLoanModalType | null>(null);
  const [selectedLoan, setSelectedLoan] = useState<TLoan | null>(null);

  const { data, isLoading, error, refetch } = useFetchCustomerLoansQuery(user.id);
  const {
    data: accountData, isLoading: isLoadingAccounts, error: accountsError
  } = useFetchAccountsQuery(user.id);

  const handleCloseLoanModal = () => {
    setSelectedLoan(null);
    setModalType(null);
  };

  const handleLoanAction = (loan: TLoan | null, action: TLoanModalType) => {
    setSelectedLoan(loan);
    setModalType(action);
  };

  const getPaymentStatusString = (loan: TLoan) => {
    return loan.paymentStatus === 'PENDING' ?
      `PENDING - ${loan.paidEmis}/${loan.numberOfEmis} installments paid` : loan.paymentStatus;
  };

  if (isLoading || isLoadingAccounts) return <LoadingOverlay show={isLoading} />;

  if (error || accountsError) {
    console.error('Error when fetching user data: ', error);
    return <ErrorOccurred />;
  }

  const loans = data ? (data as TLoansFetchResponse).data.loans : [];
  const accounts: TAccount[] = accountData ? accountData.data.accounts : [];
  const savingsAccount = accounts.find((account) => account.accountType === 'SAVINGS') as TAccount;

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
                <td>{getPaymentStatusString(loan)}</td>
                <td>
                  <Button onClick={() => handleLoanAction(loan, 'UPDATE')}>
                    {loan.status === 'PENDING' ? 'Review' : 'View'}
                  </Button>
                  {loan.status === 'APPROVED' && (
                    <Button
                      onClick={() => handleLoanAction(loan, 'PAYMENT')}
                      className="mx-2"
                      variant="warning">Make Payment</Button>
                  )}
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
            onClick={() => handleLoanAction(null, 'CREATE')}
          >Create Loan</Button>
        </Col>
      </Row>
      {modalType === 'CREATE' && (
        <LoanModal
          onClose={handleCloseLoanModal}
          onSubmit={refetch}
          customerId={user.id}
          loan={null}
        />
      )}
      {selectedLoan && modalType === 'UPDATE' && (
        <LoanModal
          onClose={handleCloseLoanModal}
          onSubmit={refetch}
          customerId={user.id}
          loan={selectedLoan}
        />
      )}
      {selectedLoan && modalType === 'PAYMENT' && (
        <LoanPaymentModal
          loan={selectedLoan}
          onClose={handleCloseLoanModal}
          onSubmit={refetch}
          savingsAccount={savingsAccount}
        />
      )}
    </Container>
  );
};

export default CustomerLoans;
