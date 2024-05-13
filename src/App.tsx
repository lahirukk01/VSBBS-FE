import '~/App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Landing from '~/pages/Landing.tsx';
import { Provider } from 'react-redux';
import { store } from '~/store/store.ts';

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
