import Table from 'react-bootstrap/Table';
import {TLoan} from '~/pages/customer-loans/types.ts';

type TLoanPaymentSummaryProps = {
  loan: TLoan;
};

const LoanPaymentSummary = ({ loan }: TLoanPaymentSummaryProps) => {
  const paymentAmount = ((loan.amount * 1.04 * 1.01) / loan.numberOfEmis).toFixed(2);

  return (
    <Table striped bordered hover>
      <tbody>
      <tr>
        <td>Loan ID</td>
        <td>{loan.id}</td>
      </tr>
      <tr>
        <td>Loan Amount</td>
        <td>{loan.amount}</td>
      </tr>
      <tr>
        <td>Interest Rate</td>
        <td>4%</td>
      </tr>
      <tr>
        <td>Purpose</td>
        <td>{loan.purpose}</td>
      </tr>
      <tr>
        <td>Payment Amount</td>
        <td>{paymentAmount}</td>
      </tr>
      </tbody>
    </Table>
  );
};

export default LoanPaymentSummary;
