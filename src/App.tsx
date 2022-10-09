import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage/Homepage';
import LandingPage from './pages/landing-page/LandingPage';
import LoginPage from './pages/login/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<LandingPage />} />
        <Route path={'/home'} element={<HomePage />} />
        <Route path={'/login'} element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
