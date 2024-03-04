import React, { useState, useEffect, useRef } from 'react'
import './Chatcontact.css'
import { useContext } from 'react';
import { PrefixUrlContext } from "../..";
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { UserContext } from '../..';

var stompClient = null;
function Chatcontact({ setChatNumber }) {
  const backendURL = useContext(PrefixUrlContext);
  const [contact, setContact] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  var contactListId;

  const call = async () => {
    const getSessionValue = async () => {
      try {
        const response = await fetch(backendURL + '/lscchat/v1.0/sessionvalues', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        const result = await response.json();
        console.log(result);
        return {
          userRole: result.userRole,
          companyId: result.company_id,
          depId: result.dep_id,
          unitId: result.unit_id
        }
      } catch (error) {
        console.error('Error fetching contact details: ' + error)
      }
    }
    setUserDetails(await getSessionValue());
  }
  
  //Fetching data onload
  useEffect(() => {
    fetchContactDetails();
    call();
  }, []);

  //WebSocket implementation
  //Connection to websocket
  const connect = () => {
    let sock = new SockJS(backendURL + "/ws");
    stompClient = over(sock);
    stompClient.connect({}, onConnect, onError);
  }

  const onConnect = (frame) => {
    console.log("Connected to the serever", frame);
    stompClient.subscribe('/user/221/private', onPrivateMessage);
  }

  const onError = (err) => {
    console.log("Error: ", err)
  }

  //Get Contact list from Web Socket
  const onPrivateMessage = (payload) => {
    let payloadData = JSON.parse(payload.body);
    console.log("Recive Message");
    console.log(payloadData);
  }
  // Call the connect function on component mount
  useEffect(() => {
    console.log(userDetails);
    contactListId = userDetails.companyId + "" + userDetails.depId + "" + userDetails.unitId;
    console.log("contact list ID: " + contactListId);
    connect();
  }, [userDetails]);

  const fetchContactDetails = async () => {
    try {
      const response = await fetch(backendURL + '/lscchat/v1.0/chatcontact', {
        method: 'POST',
        credentials: 'include', // Ensure cookies are sent for session management
        headers: {
          'Content-Type': 'application/json', // Specify content type for clarity
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`); // Provide specific error details
      }

      const result = await response.json();
      console.log(result);
      setContact(result)
    } catch (error) {
      console.error('Error fetching contact details:', error);
    }
  };

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

  const chatNumber = (number) => {
    setChatNumber({ mobileNo: number });
  }

  const renderDate = (date) => {
    const messageDate = new Date(date);
    const today = new Date();

    if (
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      // Message date is today, return time only
      return new Date(date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    } else {
      // Message date is not today, return full date
      return new Date(date).toLocaleDateString('en-US');
    }
  };
  return (
    <div className='main-chatcontact'>
      <ul className='chatcontact-card'>
        {contact.map((data, index) => (
          <li key={index} onClick={() => chatNumber(data[0])}>
            <div className='chatcontact-left'>
              <div className='chatcontact-avatar'>
                {/* {renderUserAvatar()} */}
                <div style={{ backgroundColor: "ghostwhite", color: "var(--first-color)" }}>
                  <i class="fa-duotone fa-user"></i>
                </div>
              </div>
            </div>
            <div className='chatcontact-right'>
              <div>
                <p>{data[0]}</p>
                <p style={{ fontSize: '12px', color: 'gray' }}>{renderDate(data[1])}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Chatcontact