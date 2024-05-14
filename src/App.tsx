import '~/App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import Landing from '~/pages/Landing.tsx';
import { store } from '~/store/store.ts';
import Home from "~/pages/Home.tsx";

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
