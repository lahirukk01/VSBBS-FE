import {TScope} from '~/components/AuthForm/types.ts';
import NotFound from '~/pages/NotFound.tsx';
import useAuth from '~/hooks/useAuth.ts';

const WithAuth = (allowedScopes: TScope[], Component: React.ComponentType<any>) => {
  const AuthComponent: React.FC = (props) => {
    const { auth, logout } = useAuth();

    if (!auth) return <>Loading...</>;
    if (!allowedScopes.some((scope: TScope) => auth.scope.includes(scope))) {
      return <NotFound />;
    }

    return <Component {...props} auth={auth} logout={logout} />;
  };

  return AuthComponent;
};

export default WithAuth;
