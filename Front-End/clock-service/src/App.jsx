import React from 'react'
import "./assets/styles/global.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './layouts/LoginPage/LoginPage';
import HomePage from './layouts/HomePage/HomePage';
import UserPage from './layouts/UserPage/UserPage';

export default function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/Login" element={<LoginPage />}></Route>
              <Route path="/User" element={<UserPage />}></Route>
          </Routes>
      </BrowserRouter>
  );
}
