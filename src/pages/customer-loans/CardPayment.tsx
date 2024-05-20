import {Form, InputGroup } from 'react-bootstrap';
import {TCardDetails, TCardField} from '~/pages/customer-loans/types.ts';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type TPaymentMethodComponentProps = {
  cardDetails: TCardDetails;
  onChange: (fieldName: TCardField, value: string) => void;
};

const CardPayment = ({ cardDetails, onChange }: TPaymentMethodComponentProps ) => {

  return (
    <Row>
      <Col>
        <InputGroup className="mb-3">
          <InputGroup.Text>Card Number</InputGroup.Text>
          <Form.Control
            type="text"
            maxLength={50}
            value={cardDetails.cardHolderName}
            onChange={(e) => onChange('cardHolderName', e.target.value)}
            placeholder="Enter card holder name"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Card Number</InputGroup.Text>
          <Form.Control
            type="text"
            maxLength={16}
            value={cardDetails.cardNumber}
            onChange={(e) => onChange('cardNumber', e.target.value)}
            placeholder="Enter card number"
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>Expiry Date (MM/YY)</InputGroup.Text>
          <Form.Control
            type="text"
            maxLength={5}
            value={cardDetails.expiryDate}
            onChange={(e) => onChange('expiryDate', e.target.value)}
            placeholder="MM/YY"
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>CVV</InputGroup.Text>
          <Form.Control
            type="text"
            maxLength={3}
            value={cardDetails.cvv}
            onChange={(e) => onChange('cvv', e.target.value)}
            placeholder="Enter CVV"
          />
        </InputGroup>
      </Col>
    </Row>
  );
};

export default CardPayment;
