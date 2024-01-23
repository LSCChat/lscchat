import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { createContext } from 'react';
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
  if (location.pathname !== '/' && location.pathname !== '/index') {
    return <Navbar />
  }
}
const TokenContext = createContext();
export default TokenContext;
const RenderRoute = () => {
  const [token, setToken] = useState("Bearer EAAEwXBNVMRoBO8RBWBBb2hWvUAkZAIhwsljqPVvAAcYmH76ZAQZBatrE2xBwii0sALTZBXyh84uAQs4ZACTN04j8IdK5fWFAK3wrOZCDkZCZCy0ZAXzPPQNGYofdbQOK4ZAVBFJkpgmfVjOe2OhZBX9Ijvx3md01rqaRqnszWYFDb1ixuxm8GLBHM121G87nFgfrrWR");
  return (
    <BrowserRouter>
      <TokenContext.Provider value={token}>
        <div className='main'>
          <RenderNavbar />
          <div className='main-content'>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/index" element={<Login />} />
              <Route path="send" element={<Send />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="sendlist" element={<Sendlist />} />
              <Route path="addcontacts" element={<Addcontacts />} />
              <Route path="test" element={<Test />} />
              <Route path="testing" element={<Testing />} />
              <Route path="logout" element={<Logout />} />
            </Routes>
          </div>
        </div>
      </TokenContext.Provider>
    </BrowserRouter>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RenderRoute />
);

