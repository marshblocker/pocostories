import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Layout from './pages/Layout';
import Home from './pages/Home';
import User from './pages/User';
import Settings from './pages/Settings';
import Register from './pages/Register';
import ProcessRegister from './pages/ProcessRegister';
import Error from './pages/Error'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='user' element={<User />} />
          <Route path='register' element={<Register />} />
          <Route path='register/process' element={<ProcessRegister />} />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
