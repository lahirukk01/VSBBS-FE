import Table from 'react-bootstrap/Table';
import {TTransaction} from '~/pages/customer-accounts/types.ts';
import {formatTimestampToReadable} from '~/helpers/helpers.ts';

type TTransactionsTableProps = {
  transactions: TTransaction[];
};

const TransactionsTable: React.FC<TTransactionsTableProps> = ({ transactions }) => {
  return (
    <Table striped bordered hover>
      <thead>
      <tr>
        <th>Tr. ID</th>
        <th>Amount</th>
        <th>Type</th>
        <th>Occurred At</th>
        <th>Tr. Method</th>
        <th>Description</th>
        <th>End Bank IFSC</th>
        <th>End Bank Acc. ID</th>
      </tr>
      </thead>
      <tbody>
      {transactions.map((transaction, index) => (
        <tr key={index}>
          <td>{transaction.id}</td>
          <td>{transaction.amount.toFixed(2)}</td>
          <td>{transaction.transactionType}</td>
          <td>{formatTimestampToReadable(transaction.createdAt)}</td>
          <td>{transaction.transactionMethod}</td>
          <td>{transaction.description}</td>
          <td>{transaction.endBankIfsc}</td>
          <td>{transaction.endBankAccountId}</td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
};

export default TransactionsTable;
