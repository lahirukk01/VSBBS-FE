import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import AuthForm from '~/components/AuthForm.tsx';

const Landing = () => {
  return (
    <Container>
      <Row className="mb-lg-5 mt-4">
        <Col>
          <h1 className="text-center">Welcome to Virtusa Spring Boot Banking App</h1>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs lg="6">
          <Tabs
            defaultActiveKey="Login"
            id="uncontrolled-tab-example"
            className="mb-3 d-flex justify-content-center"
          >
            <Tab eventKey="Login" title="Login">
              <AuthForm />
            </Tab>
            <Tab eventKey="Register" title="Register">
              <AuthForm registration />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
