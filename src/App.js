import { useState, useEffect } from 'react';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

import { useAuthContext } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <div className='login'>
          <BrowserRouter>
            <Routes>
              <Route path={`/`} element={<Home />} />
              {/* <PrivateRoute path={`/`} element={<Home />} /> */}

              <Route path={`/signup`} element={<SignUp />} />
              <Route path={`/login`} element={<Login />} />
              {/* <PublicRoute path="/signup" component={<SignUp />} />
              <PublicRoute path="/login" component={<Login />} /> */}
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
