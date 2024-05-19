import {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import {TBeneficiary, TBeneficiaryStatus} from '~/pages/customer-beneficiaries/types.ts';
import useManagerUpdateBeneficiary from '~/pages/manager-beneficiaries/useManagerUpdateBeneficiary.ts';

type TBeneficiaryDetailsModalProps = {
  beneficiary: TBeneficiary;
  onClose: () => void;
  onSubmit: () => void;
};

const BeneficiaryDetailsModal = ({ beneficiary, onClose, onSubmit }: TBeneficiaryDetailsModalProps) => {
  const [comments, setComments] = useState<string>(beneficiary.comments || '');
  const [status, setStatus] = useState<TBeneficiaryStatus | ''>(
    beneficiary.status || '');

  const { updateManagerBeneficiary, errorMessage, isLoading } = useManagerUpdateBeneficiary({
    onSubmit,
    onClose
  });

  const handleSubmit = async () => {
    await updateManagerBeneficiary({
      beneficiaryId: beneficiary.id,
      payload: {
        status,
        comments
      }
    }).unwrap();
  };

  const handleOnStatusChanges = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as (TBeneficiaryStatus | ''));
  };

  const disableSubmit = (status == 'PENDING' || !status) || !comments || isLoading;

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Beneficiary Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{beneficiary.name}</td>
                </tr>
                <tr>
                  <td>Email ID</td>
                  <td>{beneficiary.email}</td>
                </tr>
                <tr>
                  <td>Account ID</td>
                  <td>{beneficiary.accountId}</td>
                </tr>
                <tr>
                  <td>Account IFSC Code</td>
                  <td>{beneficiary.accountIfscCode}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>{beneficiary.status}</td>
                </tr>
                <tr>
                  <td>Manager Comments</td>
                  <td>{beneficiary.comments}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Select value={status !== 'PENDING' ? status : ''} onChange={handleOnStatusChanges}>
                <option value="">Select...</option>
                <option value="APPROVED">APPROVED</option>
                <option value="REJECTED">REJECTED</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="comments">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                as="textarea"
                value={comments}
                onChange={e => setComments(e.target.value)}
                maxLength={250}
              />
            </Form.Group>
          </Form>
        </Row>
        <Row>
          <p className="text-danger">{errorMessage}</p>
        </Row>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmit}
          disabled={disableSubmit}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BeneficiaryDetailsModal;
