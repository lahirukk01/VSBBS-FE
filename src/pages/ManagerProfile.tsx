import Form from 'react-bootstrap/Form';
import {useOutletContext} from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {TOutletContext} from '~/types/common.ts';

const ManagerProfile = () => {
  const { user } = useOutletContext<TOutletContext>();

  return (
    <Row>
      <Col>
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={user.username} readOnly />
        </Form.Group>

        <Form.Group controlId="formFirstName" className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" value={user.firstName} readOnly />
        </Form.Group>

        <Form.Group controlId="formLastName" className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" value={user.lastName} readOnly />
        </Form.Group>

        <Form.Group controlId="formCustomerId" className="mb-3">
          <Form.Label>User ID</Form.Label>
          <Form.Control
            type="number"
            min={1}
            placeholder={user.id.toString()}
            readOnly />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            placeholder={user.email ?? '********'}
            readOnly
            maxLength={50}
          />
        </Form.Group>

        <Form.Group controlId="formMobile" className="mb-3">
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            type="tel"
            required
            placeholder={user.mobile ?? '********'}
            readOnly
          />
        </Form.Group>
      </Col>
    </Row>
  );
};

export default ManagerProfile;
