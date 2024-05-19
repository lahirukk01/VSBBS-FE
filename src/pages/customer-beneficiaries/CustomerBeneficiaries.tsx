import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import {useOutletContext} from 'react-router-dom';
import {useState} from 'react';
import Button from 'react-bootstrap/Button';

import {TOutletContext} from '~/types/common.ts';
import {useFetchCustomerBeneficiariesQuery} from '~/store/BeneficiariesApiSlice.ts';
import LoadingOverlay from '~/components/layout/LoadingOverlay.tsx';
import ErrorOccurred from '~/pages/ErrorOccurred.tsx';
import {
  TBeneficiary,
  TFetchBeneficiariesResponse,
  TModalType
} from '~/pages/customer-beneficiaries/types.ts';
import BeneficiaryActionModal from '~/pages/customer-beneficiaries/BeneficiaryActionModal.tsx';
import Col from 'react-bootstrap/Col';

const CustomerBeneficiaries = () => {
  const { user } = useOutletContext<TOutletContext>();
  const { data, isLoading, error, refetch} = useFetchCustomerBeneficiariesQuery(user.id);

  const [selectedBeneficiary, setSelectedBeneficiary] = useState<TBeneficiary | null>(null);
  const [modalType, setModalType] = useState<TModalType | null>(null);

  const handleBeneficiaryAction = (
    beneficiary: TBeneficiary | null,
    selectedModalType: TModalType) => {
    setSelectedBeneficiary(beneficiary);
    setModalType(selectedModalType);
  };

  const handleBeneficiaryActionModalClose = () => {
    setSelectedBeneficiary(null);
    setModalType(null);
  };

  if (isLoading) return <LoadingOverlay show={isLoading} />;

  if (error) {
    console.error('Error when fetching user data: ', error);
    return <ErrorOccurred/>;
  }

  const beneficiaries = data ? (data as TFetchBeneficiariesResponse).data.beneficiaries : [];

  return (
    <Container>
      <Row>
        <h3 className="my-3">Customer Beneficiaries</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email ID</th>
              <th>Acc. ID</th>
              <th>Acc. IFSC Code</th>
              <th>Status</th>
              <th>Manager Comments</th>
              <th>Actions</th>
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
                <Button
                  className="mx-2"
                  variant="info"
                  onClick={() => handleBeneficiaryAction(beneficiary, 'Update')}>Update</Button>
                <Button
                  variant="danger"
                  onClick={() => handleBeneficiaryAction(beneficiary, 'Delete')}
                >Delete</Button>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      </Row>
      <Row>
        <Col>
          <Button
            variant="success"
            onClick={() => handleBeneficiaryAction(null, 'Create')}>
            Add Beneficiary
          </Button>
        </Col>
      </Row>
      {selectedBeneficiary && modalType === 'Update' && (
        <BeneficiaryActionModal
          beneficiary={selectedBeneficiary}
          customerId={user.id}
          onClose={handleBeneficiaryActionModalClose}
          onSubmit={refetch}
          modalType="Update"
        />
      )}
      {selectedBeneficiary && modalType === 'Delete' && (
        <BeneficiaryActionModal
          beneficiary={selectedBeneficiary}
          customerId={user.id}
          onClose={handleBeneficiaryActionModalClose}
          onSubmit={refetch}
          modalType="Delete"
        />
      )}
      {modalType === 'Create' && (
        <BeneficiaryActionModal
          beneficiary={null}
          customerId={user.id}
          onClose={handleBeneficiaryActionModalClose}
          onSubmit={refetch}
          modalType="Create"
        />
      )}
    </Container>
  );
};

export default CustomerBeneficiaries;
