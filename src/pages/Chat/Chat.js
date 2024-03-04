import React, { useEffect, useState } from 'react'
import Chatcontact from './Chatcontact'
import './Chat.css'
import Chatpage from './Chatpage';
import { useContext } from 'react';
import { PrefixUrlContext } from "../..";
function Chat() {
  const backendURL = useContext(PrefixUrlContext);
  const [chatNumber, setChatNumber] = useState({
    mobileNo: "",
    name: "",
  });
  const {mobileNo} = chatNumber;
  


  return (
    <div className='main-chat'>
        <div className='contact-div'>
            <Chatcontact setChatNumber={setChatNumber}/>
        </div>
        <div className='chat-div'>
            <Chatpage chatNumber={chatNumber}/>
        </div>
    </div>
  )
}

export default Chat