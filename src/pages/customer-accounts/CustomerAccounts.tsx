import {useOutletContext} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import {useFetchAccountsQuery} from '~/store/AccountsApiSlice.ts';
import {TOutletContext} from '~/types/common.ts';
import LoadingOverlay from '~/components/layout/LoadingOverlay.tsx';
import ErrorOccurred from '~/pages/ErrorOccurred.tsx';
import {useState} from 'react';
import Container from 'react-bootstrap/Container';
import AccountDetails from '~/pages/customer-accounts/AccountDetails.tsx';
import {TAccount, TAccountFetchResponse} from '~/pages/customer-accounts/types.ts';

const CustomerAccounts = () => {
  const { user } = useOutletContext<TOutletContext>();
  const { data, isLoading, error} = useFetchAccountsQuery(user.id);

  const [selectedAccount, setSelectedAccount] = useState<TAccount | null>(null);

  if (isLoading) return <LoadingOverlay show={isLoading} />;

  if (error) {
    console.error('Error when fetching user data: ', error);
    return <ErrorOccurred/>;
  }

  const accounts = (data as TAccountFetchResponse).data.accounts;

  return (
    <Container>
      <Row>
        <h3 className="my-3">Customer Accounts</h3>
        <Table striped bordered hover>
          <thead>
          <tr>
            <th>Account ID</th>
            <th>Account Type</th>
            <th>Balance</th>
            <th>View Transactions</th>
          </tr>
          </thead>
          <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.accountType}</td>
              <td>{account.balance.toFixed(2)}</td>
              <td><Button onClick={() => setSelectedAccount(account)}>Select</Button></td>
            </tr>
          ))}
          </tbody>
        </Table>
      </Row>
      {selectedAccount &&
        <AccountDetails account={selectedAccount} customerId={user.id} />}
    </Container>
  );
};

export default CustomerAccounts;
