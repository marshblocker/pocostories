import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import { CurrentUserContext } from './contexts/context';
import authService from './services/authService';

import Layout from './pages/Layout';
import User from './pages/User';
import Login from './pages/Login';
import ProcessLogin from './pages/ProcessLogin';
import Logout from './pages/Logout';
import Register from './pages/Register';
import ProcessRegister from './pages/ProcessRegister';
import Error from './pages/Error'
import Story from './pages/Story';
import CreateStory from './pages/CreateStory';
import Stories from './pages/Stories';

function App() {
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    if (authService.basicAuthInCookie()) {
      const username = authService.getBasicAuthInCookie('username');
      if (username != null) {
        setCurrentUser(username);
      }
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Stories />} />
              <Route path='create-story' element={<CreateStory />} />
              <Route path='story/:id' element={<Story />} />
              <Route path='user' element={<User />} />
              <Route path='login' element={<Login />} />
              <Route path='login/process' element={<ProcessLogin setCurrentUser={setCurrentUser} />} />
              <Route path='logout' element={<Logout setCurrentUser={setCurrentUser} />}/>
              <Route path='register' element={<Register />} />
              <Route path='register/process' element={<ProcessRegister />} />
              <Route path='*' element={<Error />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

export default App;
