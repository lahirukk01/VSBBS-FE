import Button from 'react-bootstrap/Button';
import {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import {useFetchManagerBeneficiariesQuery} from '~/store/ManagerBeneficiariesApiSlice.ts';
import LoadingOverlay from '~/components/layout/LoadingOverlay.tsx';
import ErrorOccurred from '~/pages/ErrorOccurred.tsx';
import {TBeneficiary, TFetchBeneficiariesResponse} from '~/pages/customer-beneficiaries/types.ts';
import BeneficiaryDetailsModal from '~/pages/manager-beneficiaries/BenefeciaryDetailsModal.tsx';

const ManagerBeneficiaries = () => {
  const {
    data, error, isLoading, refetch
  } = useFetchManagerBeneficiariesQuery(null);

  const [selectedBeneficiary, setSelectedBeneficiary] = useState<TBeneficiary | null>(null);

  if (isLoading) return <LoadingOverlay show={isLoading} />;

  if (error) {
    console.error('Error when fetching user data: ', error);
    return <ErrorOccurred/>;
  }

  const beneficiaries = data ? (data as TFetchBeneficiariesResponse).data.beneficiaries : [];

  return (
    <Container>
      <Row>
        <h3 className="my-3">Manager Beneficiaries</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email ID</th>
              <th>Acc. ID</th>
              <th>Acc. IFSC Code</th>
              <th>Status</th>
              <th>Manager Comments</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {beneficiaries.map((beneficiary) => (
              <tr key={beneficiary.id}>
                <td>{beneficiary.name}</td>
                <td>{beneficiary.email}</td>
                <td>{beneficiary.accountId}</td>
                <td>{beneficiary.accountIfscCode}</td>
                <td>{beneficiary.status}</td>
                <td>{beneficiary.comments}</td>
                <td>
                  <Button onClick={() => setSelectedBeneficiary(beneficiary)}>Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {selectedBeneficiary && (
          <BeneficiaryDetailsModal
            beneficiary={selectedBeneficiary}
            onClose={() => setSelectedBeneficiary(null)}
            onSubmit={refetch}
          />
        )}
      </Row>
    </Container>
  );
};

export default ManagerBeneficiaries;
