import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {TAccount} from '~/pages/customer-accounts/types.ts';
import {TBeneficiary, TTransactionMethod, TTransferMoneyFetchArgs} from '~/pages/customer-beneficiaries/types.ts';
import {useState} from 'react';
import useTransferMoney from '~/pages/customer-beneficiaries/useTransferMoney.ts';
import Row from 'react-bootstrap/Row';

type TMoneyTransferModalProps = {
  beneficiary: TBeneficiary;
  accounts: TAccount[];
  onClose: () => void;
  onSubmit: () => void;
};

const MoneyTransferModal: React.FC<TMoneyTransferModalProps> = ({
  beneficiary, onClose, accounts, onSubmit
}) => {
  const [selectedAccount, setSelectedAccount] = useState<TAccount>(accounts[0]);
  const [amount, setAmount] = useState<number>(0);
  const [selectedTransferOption, setSelectedTransferOption] = useState<TTransactionMethod>('UPI');
  const [description, setDescription] = useState<string>('');

  const { transferMoney, isLoading, errorMessage } = useTransferMoney({ onClose, onSubmit });

  const handleSubmit = async () => {
    const fetchArgs: TTransferMoneyFetchArgs = {
      pathParams: {
        accountId: selectedAccount.id,
        customerId: beneficiary.customerId,
      },
      payload: {
        amount,
        beneficiaryId: beneficiary.id,
        transactionMethod: selectedTransferOption,
        description,
      }
    };
    await transferMoney(fetchArgs).unwrap();
  };

  const handleAccountSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAccountId = +e.target.value;
    const selectedAccount = accounts.find(account => account.id === selectedAccountId);
    setSelectedAccount(selectedAccount as TAccount);
  };

  const handleTransferOptionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTransferOption(e.target.value as TTransactionMethod);
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Transfer Money To Beneficiary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicSelect">
            <Form.Label>Select Your Account</Form.Label>
            <Form.Select value={selectedAccount.id} onChange={handleAccountSelect}>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.id} - {account.accountType}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <p>Existing Balance: {selectedAccount.balance}</p>
          <Form.Group className="mb-3" controlId="formBasicAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number" min={0.1}
              placeholder="Enter amount"
              onChange={(e) => setAmount(+e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicSelect">
            <Form.Label>Select Transfer Option</Form.Label>
            <Form.Select value={selectedTransferOption} onChange={handleTransferOptionSelect}>
              <option value="UPI">UPI</option>
              <option value="NEFT">NEFT</option>
              <option value="INTERNAL">INTERNAL</option>
              <option value="RTGS">RTGS</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicBeneficiaryName">
            <Form.Label>Beneficiary Name</Form.Label>
            <Form.Control type="text" placeholder={beneficiary.name} readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAmount">
            <Form.Label>Beneficiary Account</Form.Label>
            <Form.Control type="text" placeholder={beneficiary.accountId.toString()} readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              maxLength={50} type="text" placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Row>
          {isLoading && <p>Transferring money to {beneficiary.name}...</p>}
          <p className="text-danger">{errorMessage}</p>
        </Row>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button
          disabled={amount <= 0.1 || isLoading}
          variant="primary"
          onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MoneyTransferModal;
