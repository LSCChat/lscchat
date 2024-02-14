import React, { useEffect, useState } from 'react'
import Chatcontact from './Chatcontact'
import './Chat.css'
import Chatpage from './Chatpage';
import { useContext } from 'react';
import { PrefixUrlContext } from "../..";
function Chat() {
  const backendURL = useContext(PrefixUrlContext);
  const [chatNumber, setChatNumber] = useState({
    mobileNo: ""
  });
  const {mobileNo} = chatNumber;
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChat();
  }, [chatNumber, setChatNumber])

  setTimeout(function() {
    fetchChat();
  }, 5000); 

  const fetchChat = async () => {
    try {
      const response = await fetch(backendURL+'/lscchat/v1.0/chat', {
        method: 'POST',
        credentials: 'include', // Ensure cookies are sent for session management
        headers: {
          'Content-Type': 'application/json', // Specify content type for clarity
        },
        body: JSON.stringify({ mobileNo }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`); // Provide specific error details
      }

      const result = await response.json();
      console.log(result);
      setChats(result)
    } catch (error) {
      console.error('Error fetching contact details:', error);
    }
  };
  return (
    <div className='main-chat'>
        <div className='contact-div'>
            <Chatcontact setChatNumber={setChatNumber}/>
        </div>
        <div className='chat-div'>
            <Chatpage chats={chats} chatNumber={chatNumber} fetchChat={fetchChat}/>
        </div>
    </div>
  )
}

export default Chat