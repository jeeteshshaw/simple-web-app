import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import Dashboard from './Screens/Dashboard';
import { Provider } from 'react-redux';
import { store } from './store';

const App: React.FC = () => {
  const [LoginStatus, setLoginStatus] = useState(false);
  useEffect(() => {
    setLoginStatus(localStorage.getItem('token') ? true : false);
  }, [])

  return (
    <Provider store={store}>
    <Router>

      {
        LoginStatus
          ? (
            <Routes>

              <Route index path="/" element={<Dashboard onLogout={() => setLoginStatus(false)} />} />
            </Routes>

          )
          : (
            <Routes>
              <Route index path="/signup" element={<Signup onSignup={() => setLoginStatus(true)} />} />
              <Route path="/" element={<Login onLogin={() => setLoginStatus(true)} />} />
            </Routes>
          )

      }

    </Router>
    </Provider>
  );
}

export default App;
