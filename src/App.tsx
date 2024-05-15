import '~/App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '~/store/store.ts';
import {ROUTE_BUILDER} from '~/constants.ts';
import Landing from '~/pages/Landing.tsx';
import Home from '~/pages/Home.tsx';
import Layout from '~/components/layout/Layout.tsx';
import NotFound from '~/pages/NotFound.tsx';

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path={ROUTE_BUILDER.CUSTOMER.HOME} element={<Layout />} />
          <Route path={ROUTE_BUILDER.MANAGER.HOME} element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
