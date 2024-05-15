import {useEffect, useState, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

import {TJwtPayload} from '~/components/AuthForm/types.ts';

const useAuth = () => {
  const [auth, setAuth] = useState<TJwtPayload | null>(null);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('vsbbaAuth');
    setAuth(null);
    navigate('/', { replace: true });
  }, [navigate]);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('vsbbaAuth') || '{}');
    if (!authData || !authData.data || authData.data.exp * 1000 < Date.now()) {
      return logout();
    }
    setAuth(authData.data);
  }, [logout]);

  return { auth, logout, setAuth };
};

export default useAuth;
