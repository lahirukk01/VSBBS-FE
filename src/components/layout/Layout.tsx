import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Stack} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Link, useLocation, Outlet} from 'react-router-dom';
import cn from 'classnames';

import {AuthComponentProps, TScope} from '~/components/AuthForm/types.ts';
import {ROUTE_BUILDER, SCOPE} from '~/constants.ts';
import WithAuth from '~/hoc/WithAuth.tsx';
import {TUserFetchResponseSuccess, useFetchUserQuery} from '~/store/UsersApiSlice.ts';
import LoadingOverlay from '~/components/layout/LoadingOverlay.tsx';
import ErrorOccurred from '~/pages/ErrorOccurred.tsx';

const Component: React.FC<AuthComponentProps> = ({ auth, logout, setAuth }) => {
  const { pathname } = useLocation();

  const { data, error, isLoading } = useFetchUserQuery(auth.userId);

  const userRoutes = ROUTE_BUILDER[auth.scope[0]];

  if (isLoading) return <LoadingOverlay show={isLoading} />;

  if (error) {
    console.error('Error when fetching user data: ', error);
    return <ErrorOccurred/>;
  }

  const user = (data as TUserFetchResponseSuccess).data.user;

  /**
   * Display sections other than profile to manager and active customers only
   * */
  const displayFunctionalSections = auth.scope[0] === SCOPE.MANAGER || (user.id !== 0);

  return (
    <Container fluid className="vh-100 d-flex flex-column mx-0">
      <Row className="bg-dark">
        <Col>
          <h4 className="text-center py-2 text-white">
            Welcome {`${user.firstName} ${user.lastName}`}
          </h4>
        </Col>
      </Row>
      <Row className="flex-grow-1">
        <Col xs={2} style={{ background: 'linear-gradient(to top, #0000ff, #000000)' }}>
          <h3 className="text-white mt-3">Menu</h3>
          <Stack gap={3}>
            <div
              className={cn('p-2 text-white',
              { 'bg-primary': pathname === userRoutes.PROFILE })}
            ><Link className="app-link d-block" to={userRoutes.PROFILE}>Profile</Link></div>

            {displayFunctionalSections && <>{auth.scope[0] === SCOPE.CUSTOMER &&
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
              </>}
            <div className="p-2 text-white"><Button variant="success" onClick={logout}>Logout</Button></div>
          </Stack>
        </Col>
        <Col xs={10} style={{ backgroundColor: '#DDDDDD' }}>
          <Outlet context={{ auth, user, setAuth }} />
        </Col>
      </Row>
    </Container>
  );
};

const Layout = ({ scope }: {scope: TScope}) => <WithAuth allowedScopes={[scope]} Component={Component} />;

export default Layout;
