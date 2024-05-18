import '~/App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '~/store/store.ts';
import {SCOPE} from '~/constants.ts';
import Landing from '~/pages/Landing.tsx';
import Layout from '~/components/layout/Layout.tsx';
import NotFound from '~/pages/NotFound.tsx';
import CustomerProfile from '~/pages/CustomerProfile.tsx';
import CustomerAccounts from '~/pages/customer-accounts/CustomerAccounts.tsx';
import CustomerBeneficiaries from '~/pages/customer-beneficiaries/CustomerBeneficiaries.tsx';
import ManagerProfile from '~/pages/ManagerProfile.tsx';

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/customer" element={<Layout scope={SCOPE.CUSTOMER} />}>
            <Route path="profile" element={<CustomerProfile />} />
            <Route path="accounts" element={<CustomerAccounts />} />
            <Route path="beneficiaries" element={<CustomerBeneficiaries />} />
          </Route>
          <Route path="/manager" element={<Layout scope={SCOPE.MANAGER} />}>
            <Route path="profile" element={<ManagerProfile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
