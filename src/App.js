import { useState, useEffect } from 'react';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <div className='login'>
          <BrowserRouter>
            <Routes>
              <Route path={`/`} element={<Home />} />
              <Route path={`/signup`} element={<SignUp />} />
              <Route path={`/login`} element={<Login />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
