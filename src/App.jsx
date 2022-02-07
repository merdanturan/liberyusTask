import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import AddDomain from "./pages/domain/AddDomain";
import ListDomain from "./pages/domain/ListDomain";
import './assets/scss/global.scss'

const App = () => {
  const { token } = useSelector(state => state.auth)
  const navigate = useNavigate()

  ///Check logged in
  useEffect(() => {
    const isLogged = token;
    if (!isLogged) {
      navigate('/login')
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} exact />
        <Route path="/add" element={<AddDomain />} exact />
        <Route path="/list" element={<ListDomain />} exact />
      </Routes>
    </>
  );
};

export default App;

