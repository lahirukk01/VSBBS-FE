import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {TJwtPayload} from '~/components/AuthForm/types.ts';

const useAuth = () => {
  const [auth, setAuth] = useState<TJwtPayload | null>(null);
  const navigate = useNavigate();

  const logout = () => {
    if (!auth) return;
    localStorage.removeItem('vsbbaAuth');
    setAuth(null);
    navigate('/', { replace: true });
  };

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('vsbbaAuth') || '{}');
    if (!authData || !authData.data || authData.data.exp * 1000 < Date.now()) {
      setAuth(null);
    }
    setAuth(authData.data);
  }, []);

  return { auth, logout };
};

export default useAuth;
