import '~/App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '~/store/store.ts';
import {ROUTE_BUILDER} from '~/constants.ts';
import Landing from '~/pages/Landing.tsx';
import Home from '~/pages/Home.tsx';
import Layout from '~/components/layout/Layout.tsx';
import NotFound from '~/pages/NotFound.tsx';
import CustomerProfile from '~/pages/CustomerProfile.tsx';
import CustomerAccounts from '~/pages/customer-accounts/CustomerAccounts.tsx';

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/customer" element={<Layout />}>
            <Route path="profile" element={<CustomerProfile />} />
            <Route path="accounts" element={<CustomerAccounts />} />
          </Route>
          <Route path={ROUTE_BUILDER.MANAGER.PROFILE} element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
