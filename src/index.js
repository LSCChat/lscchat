import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Chat from './pages/Chat/Chat';
import Navbar from './pages/Navbar/Navbar';
import './Style.css';
import Send from './pages/SendMessage/Send';
import Contacts from './pages/Contacts/Contacts';
import Sendlist from './pages/SendMessage/Sendlist';
import Addcontacts from './pages/Contacts/Addcontacts';
import Test from './pages/Test/Test';
import Login from './pages/Login/Login';
import Testing from './pages/Testing/Testing';
import Logout from './pages/Logout/Logout';
import Compaign from './pages/Contacts/compaign';

const RenderNavbar = () => {
  const location = useLocation();
  if(location.pathname !== '/' && location.pathname !== '/index'){
    return <Navbar />
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>

      <div className='main'>
      <RenderNavbar />
        <div className='main-content'>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/index" element={<Login />} />
            <Route path="send" element={<Send />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="sendlist" element={<Sendlist />} />
            <Route path="addcontacts" element={<Compaign />} />
            <Route path="test" element={<Test />} />
            <Route path="testing" element={<Testing />} />
            <Route path="logout" element={<Logout />} />
          </Routes>
        </div>

      </div>
  </BrowserRouter>
);

