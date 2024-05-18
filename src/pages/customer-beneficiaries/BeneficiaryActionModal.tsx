import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {TBeneficiary, TBeneficiaryBase, TModalType} from '~/pages/customer-beneficiaries/types.ts';
import {useState} from 'react';
import Row from 'react-bootstrap/Row';

import {beneficiaryModalInputValidator} from '~/pages/customer-beneficiaries/helpers.ts';
import useBeneficiaryMutations from '~/pages/customer-beneficiaries/useBeneficiaryMutations.ts';

export type TBeneficiaryActionModalProps = {
  customerId: number;
  beneficiary: TBeneficiary | null;
  onClose: () => void;
  onSubmit: () => void;
  modalType: TModalType;
};

const BeneficiaryActionModal: React.FC<TBeneficiaryActionModalProps> = ({
  beneficiary, onClose, modalType, onSubmit, customerId }) => {
  const [name, setName] = useState<string>(beneficiary?.name || '');
  const [email, setEmail] = useState<string>(beneficiary?.email || '');
  const [accountId, setAccountId] = useState<number>(beneficiary?.accountId || 0);
  const [accountIfscCode, setAccountIfscCode] = useState<string>(beneficiary?.accountIfscCode || '');
  const [inputError, setInputError] = useState<string>('');

  const { createCustomerBeneficiary, updateCustomerBeneficiary,
    deleteCustomerBeneficiary, errorMessage, isLoading,
  } = useBeneficiaryMutations({ onSubmit, onClose });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z\s]*$/;

    if (regex.test(value)) {
      setName(value);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[a-zA-Z0-9._%+-@]*$/;

    if (regex.test(e.target.value)) {
      setEmail(e.target.value);
    }
  };

  const handleAccountIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = parseInt(value, 10);

    if (!isNaN(parsedValue) && parsedValue > 0) {
      setAccountId(parsedValue);
    }
  };

  const handleAccountIfscCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^[A-Z0-9]*$/;

    if (regex.test(value)) {
      setAccountIfscCode(value);
    }
  };

  const handleSubmit = async () => {
    const payload: TBeneficiaryBase = { name, email, accountId, accountIfscCode };
    const error = beneficiaryModalInputValidator({ name, email, accountId, accountIfscCode });

    if (error) {
      setInputError(error);
    } else {
      try {
        if (modalType === 'Update') {
          await updateCustomerBeneficiary({ payload, beneficiaryId: beneficiary?.id, customerId });
        } else if (modalType === 'Create') {
          await createCustomerBeneficiary({ payload, customerId });
        } else if (modalType === 'Delete') {
          await deleteCustomerBeneficiary({ beneficiaryId: beneficiary?.id, customerId: 1 });
        }
      } catch (error) {
        console.error('Failed to submit beneficiary action: ', error);
      }
    }
  };

  const disableSubmitButton = isLoading ||
    beneficiaryModalInputValidator({ name, email, accountId, accountIfscCode }) !== '';

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalType} Beneficiary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBeneficiaryName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              maxLength={50} type="text" value={name}
              readOnly={modalType === 'Delete'}
              onChange={handleNameChange}
            />
          </Form.Group>

          <Form.Group controlId="formBeneficiaryEmail" className="mb-3">
            <Form.Label>Email ID</Form.Label>
            <Form.Control
              maxLength={50} type="email" value={email} readOnly={modalType === 'Delete'}
              onChange={handleEmailChange}
            />
          </Form.Group>

          <Form.Group controlId="formBeneficiaryAccountId" className="mb-3">
            <Form.Label>Account ID</Form.Label>
            <Form.Control
              maxLength={15} type="text" value={accountId} readOnly={modalType === 'Delete'}
              onChange={handleAccountIdChange}
            />
          </Form.Group>

          <Form.Group controlId="formBeneficiaryAccountIfscCode" className="mb-3">
            <Form.Label>Account IFSC Code</Form.Label>
            <Form.Control
              maxLength={10}
              type="text"
              value={accountIfscCode}
              readOnly={modalType === 'Delete'}
              onChange={handleAccountIfscCodeChange}
            />
          </Form.Group>
        </Form>
        <Row>
          <p className="text-danger">{inputError || errorMessage}</p>
        </Row>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button
          disabled={disableSubmitButton}
          variant={modalType === 'Delete' ? 'danger' : 'success'}
          onClick={handleSubmit}>{modalType}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BeneficiaryActionModal;
