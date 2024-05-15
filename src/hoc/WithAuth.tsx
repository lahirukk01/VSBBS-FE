import {TScope} from '~/components/AuthForm/types.ts';
import NotFound from '~/pages/NotFound.tsx';
import useAuth from '~/hooks/useAuth.ts';

const WithAuth = (allowedScopes: TScope[], Component: React.FC<any>) => {
  const AuthComponent: React.FC = (props) => {
    const {auth, setAuth, logout} = useAuth();

    if (!auth) return <>Loading...</>;
    if (!allowedScopes.some((scope: TScope) => auth.scope.includes(scope))) {
      return <NotFound/>;
    }

    return <Component {...props} auth={auth} logout={logout} setAuth={setAuth}/>;
  };

  return AuthComponent;
};

export default WithAuth;
