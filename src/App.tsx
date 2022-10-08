import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path={"/"} element={<Home />} /> */}
        <Route path={'/login'} element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
