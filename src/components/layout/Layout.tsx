import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Stack} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Link, useLocation} from 'react-router-dom';
import cn from 'classnames';

import {AuthComponentProps} from '~/components/AuthForm/types.ts';
import {ROUTE_BUILDER, SCOPE} from '~/constants.ts';
import WithAuth from '~/hoc/WithAuth.tsx';

const Component: React.FC<AuthComponentProps> = ({ auth, logout }) => {
  console.log('Auth: ', auth);
  const { pathname } = useLocation();

  const userRoutes = ROUTE_BUILDER[auth.scope[0]];

  return (
    <Container fluid className="vh-100 d-flex flex-column mx-0">
      <Row>
        Top row
      </Row>
      <Row className="flex-grow-1">
        <Col xs={3} style={{ backgroundColor: '#0000FF' }}>
          <h3 className="text-white">Menu</h3>
          <Stack gap={3}>
            <div
              className={cn('p-2 text-white',
              { 'bg-primary': pathname === userRoutes.HOME })}
            ><Link className="app-link d-block" to={userRoutes.HOME}>Home</Link></div>
            {auth.scope[0] === SCOPE.CUSTOMER &&
              <div
                className={cn('p-2 text-white',
                { 'bg-primary': pathname === userRoutes.ACCOUNTS })}
              ><Link className="app-link d-block" to={userRoutes.ACCOUNTS as string}>Accounts</Link></div>}
            <div
              className={cn('p-2 text-white',
                { 'bg-primary': pathname === userRoutes.BENEFICIARIES })}
            >
              <Link className="app-link d-block" to={userRoutes.BENEFICIARIES}>Beneficiaries</Link>
            </div>
            <div
              className={cn('p-2 text-white',
                { 'bg-primary': pathname === userRoutes.LOANS })}>
              <Link className="app-link d-block" to={userRoutes.LOANS}>Loans</Link>
            </div>
            <div className="p-2 text-white"><Button variant="success" onClick={logout}>Logout</Button></div>
          </Stack>
        </Col>
        <Col xs={9} style={{ backgroundColor: '#DDDDDD' }}>
          <h1>Content</h1>
        </Col>
      </Row>
    </Container>
  );
};

const Home = WithAuth([SCOPE.CUSTOMER, SCOPE.MANAGER], Component);

export default Home;
