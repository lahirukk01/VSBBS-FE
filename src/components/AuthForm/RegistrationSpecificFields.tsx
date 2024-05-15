import Form from 'react-bootstrap/Form';

const RegistrationSpecificFields = () => {
  return (<>
    <Form.Group className="mb-3" controlId="formFirstName">
      <Form.Label>First Name</Form.Label>
      <Form.Control type="text" placeholder="Enter first name" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formLastName">
      <Form.Label>Last Name</Form.Label>
      <Form.Control type="text" placeholder="Enter last name" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formMobileNumber">
      <Form.Label>Mobile Number</Form.Label>
      <Form.Control type="tel" placeholder="Enter mobile number" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>
  </>);
};

export default RegistrationSpecificFields;
