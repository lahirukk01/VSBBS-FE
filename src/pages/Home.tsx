import Container from 'react-bootstrap/Container';

import {SCOPE} from '~/constants.ts';
import WithAuth from '~/hoc/WithAuth.tsx';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {AuthComponentProps} from '~/components/AuthForm/types.ts';

const Component: React.FC<AuthComponentProps> = ({ auth }) => {
  console.log('Auth: ', auth);
  return (
    <Container>
      <Row>
        Top row
      </Row>
      <Row>
        <Col xs={3}>
          <h1>Menu</h1>
        </Col>
        <Col xs={9}>
          <h1>Content</h1>
        </Col>
      </Row>
    </Container>
  );
};

const Home = WithAuth([SCOPE.CUSTOMER, SCOPE.MANAGER], Component);

export default Home;
