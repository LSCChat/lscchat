import React from 'react'
import { useContext } from 'react';
import { TokenContext } from '../..';
import './Chatpage.css';
import { PrefixUrlContext } from "../..";

function Chatpage({chats, chatNumber, fetchChat}) {
    const backendURL = useContext(PrefixUrlContext);
    const getRandomColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
      }
    
      const getContrastColor = (hexColor) => {
        const threshold = 130;
        const rgb = parseInt(hexColor.slice(1), 16);
        const brightness = ((rgb >> 16) * 299 + (rgb >> 8 & 255) * 587 + (rgb & 255) * 114) / 1000;
    
        return brightness > threshold ? '#000' : '#fff';
      }
    
      const renderUserAvatar = () => {
          const initials = <i class="fa-duotone fa-user"></i>; //getInitials(profileName)
          const backgroundColor = getRandomColor();
          const textColor = getContrastColor(backgroundColor);
    
          return (
            <div
              style={{ backgroundColor, color: textColor }}
            >
              {initials}
            </div>
          );
      }

      const token = useContext(TokenContext);
      const sendMessage = async() => {
        
        const headers = {
            Authorization: token, // Replace with your access token
            'Content-Type': 'application/json'
        };
        let text = document.getElementById("message").value;
        const messageData = {
            messaging_product: "whatsapp",
            to: chatNumber.mobileNo, // Replace with the recipient's phone number in international format
            type: "text",
            text: {
                body: text
            }
        };

        if(text != "" && text != "") {
            try {
                const response = await fetch('https://graph.facebook.com/v17.0/210009328855768/messages?', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(messageData)
                });
    
                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
                }
    
                const responseData = await response.json();
                console.log('Message sent(responseData):', responseData);
                // console.log('Message_id :' + responseData.messages[0].id);
    
                //API for message sended
                try {
                    const response = await fetch(backendURL+'/lscchat/v1.0/message', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            message_id: responseData.messages[0].id,
                            message_type: 1,
                            message: text,
                            receive_id: responseData.contacts[0].wa_id,
                            send_id: "917845810780"
                        }),
                        credentials: 'include',
                    });
    
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
    
                    const data = await response.json();
                    fetchChat();
                    document.getElementById("message").value = "";
                    // console.log('Response from server:', data);
                } catch (error) {
                    console.error('Error:', error.message);
                }
    
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
      }
  return (
    <div className='main-chatpage'>
        {chatNumber.mobileNo &&
        <div className='chat-container'>
            <div className='chats-header'>
                <div className='chatcontact-avatar'>
                    {renderUserAvatar()}
                </div>
                <div>{chatNumber.mobileNo}</div>
            </div>
            <div className='chats'>
                {chats.map((data, index) => (
                    <div key={index} className={data.type == 1 ? 'right':'left'}>
                        <div>{data.message}</div>
                        <div className='data-time'>{data.dateTime}</div>
                    </div>
                ))}
            </div>
            <div className='sent-message'>
                <textarea rows={1} id='message' placeholder='Message'></textarea>
                <button onClick={() => sendMessage()}>Send</button>
            </div>
        </div>
        }
    </div>
  )
}

export default Chatpage