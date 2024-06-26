import '~/App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';

import { store } from '~/store/store.ts';
import {SCOPE} from '~/constants.ts';
import Landing from '~/pages/Landing.tsx';
import Layout from '~/components/layout/Layout.tsx';
import NotFound from '~/pages/NotFound.tsx';
import CustomerProfile from '~/pages/CustomerProfile.tsx';
import CustomerAccounts from '~/pages/customer-accounts/CustomerAccounts.tsx';
import CustomerBeneficiaries from '~/pages/customer-beneficiaries/CustomerBeneficiaries.tsx';
import ManagerProfile from '~/pages/ManagerProfile.tsx';
import ManagerBeneficiaries from '~/pages/manager-beneficiaries/ManagerBeneficiaries.tsx';
import CustomerLoans from '~/pages/customer-loans/CustomerLoans.tsx';
import ManagerLoans from '~/pages/manager-loans/ManagerLoans.tsx';
import {ReactNode} from 'react';

type TErrorFallbackProps = {
  error: Error | null;
  children?: ReactNode;
};

const ErrorFallback: React.FC<TErrorFallbackProps> = ({ error }) => {
  console.error('Error occurred: ', error);
  window.location.href = '/';
  return '';
};

const App = () => {

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/customer" element={<Layout scope={SCOPE.CUSTOMER} />}>
              <Route path="profile" element={<CustomerProfile />} />
              <Route path="accounts" element={<CustomerAccounts />} />
              <Route path="beneficiaries" element={<CustomerBeneficiaries />} />
              <Route path="loans" element={<CustomerLoans />} />
            </Route>
            <Route path="/manager" element={<Layout scope={SCOPE.MANAGER} />}>
              <Route path="profile" element={<ManagerProfile />} />
              <Route path="beneficiaries" element={<ManagerBeneficiaries />} />
              <Route path="loans" element={<ManagerLoans />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
