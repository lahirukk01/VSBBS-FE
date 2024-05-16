import {useEffect, useMemo, useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {TAccountDetailsProps, TFetchAccountTransactionsResponse} from '~/pages/customer-accounts/types.ts';
import {TFetchAccountsRequestParams, useFetchAccountTransactionsQuery} from '~/store/AccountsApiSlice.ts';
import {Form, InputGroup} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import TransactionsTable from '~/pages/customer-accounts/TransactionsTable.tsx';

const AccountDetails = ({ account, customerId }: TAccountDetailsProps) => {
  const [fetchTransactionsParams, setFetchTransactionsParams] = useState<TFetchAccountsRequestParams>({
    pathParams: { customerId, accountId: account.id },
    queryParams: {
      onDate: '',
      fromDate: '',
      toDate: '',
    }
  });
  const [onDate, setOnDate] = useState<string>('');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  const {data, isLoading, error} = useFetchAccountTransactionsQuery(
    fetchTransactionsParams);

  useEffect(() => {
    setFetchTransactionsParams({
      queryParams: {
        onDate: '',
        fromDate: '',
        toDate: '',
      },
      pathParams: { customerId, accountId: account.id }
    });
  }, [account.id, customerId]);

  const TODAY = useMemo(() => new Date().toISOString().split('T')[0], []);

  const handleOnDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOnDate(e.target.value);
    setFromDate('');
    setToDate('');
  };

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(e.target.value);
    setOnDate('');
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(e.target.value);
    setOnDate('');
  };

  const handleOnSearch = () => {
    setFetchTransactionsParams((prev) => ({
      ...prev,
      queryParams: {
        onDate: onDate || '',
        fromDate: fromDate || '',
        toDate: toDate || '',
      }
    }));
  };

  if (error) {
    console.error('Error when fetching account transactions: ', error);
  }

  const transactions = data ? (data as TFetchAccountTransactionsResponse).data.transactions : [];
  const disableSearch = (!onDate && !fromDate && !toDate) || isLoading;

  return (
    <Row>
      <h4>Account Details</h4>
      <Row className="my-2">
        <Col><h6>ID: {account.id}</h6></Col>
        <Col><h6>Type: {account.accountType}</h6></Col>
        <Col><h6>Balance: {account.balance.toFixed(2)}</h6></Col>
      </Row>
      <Row>
        <Row>
          <h5>Transactions</h5>
          {isLoading && <p>Loading...</p>}
          {error && <p>Error occurred</p>}
        </Row>
        <Row className="mt-3">
          <Col xs={10}>
            <Row>
              <Col>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">On Date</InputGroup.Text>
                  <Form.Control
                    aria-label="ondate"
                    aria-describedby="basic-addon1"
                    type="date"
                    max={TODAY}
                    value={onDate}
                    onChange={handleOnDateChange}
                  />
                </InputGroup>
              </Col>
              <Col>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon2">From Date</InputGroup.Text>
                  <Form.Control
                    aria-label="fromdate"
                    aria-describedby="basic-addon2"
                    type="date"
                    max={toDate || TODAY}
                    value={fromDate}
                    onChange={handleFromDateChange}
                  />
                </InputGroup>
              </Col>
              <Col>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon3">To Date</InputGroup.Text>
                  <Form.Control
                    aria-label="todate"
                    aria-describedby="basic-addon3"
                    type="date"
                    max={TODAY}
                    min={fromDate}
                    value={toDate}
                    onChange={handleToDateChange}
                  />
                </InputGroup>
              </Col>
            </Row>
          </Col>
          <Col xs={2}>
            <Button
              disabled={disableSearch}
              onClick={handleOnSearch}
            >
              Search
            </Button>
          </Col>
        </Row>
        <Row className="mt-3">
          <TransactionsTable transactions={transactions} />
        </Row>
      </Row>
    </Row>
  );
};

export default AccountDetails;
