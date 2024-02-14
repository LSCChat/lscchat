import React, { useState, useEffect } from 'react'
import './Chatcontact.css'
import { useContext } from 'react';
import { PrefixUrlContext } from "../..";

function Chatcontact({setChatNumber}) {
  const backendURL = useContext(PrefixUrlContext);
  const [contact, setContact] = useState([]);

  //Fetching data onload
  useEffect(() => {
    fetchContactDetails();
  }, []);

  const fetchContactDetails = async () => {
    try {
      const response = await fetch(backendURL+'/lscchat/v1.0/chatcontact', {
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
    setChatNumber({mobileNo: number});
  }
  return (
    <div className='main-chatcontact'>
      <ul className='chatcontact-card'>
        {contact.map((data, index) => (
          <li key={index} onClick={()=>chatNumber(data[0])}>
            <div className='chatcontact-left'>
              <div className='chatcontact-avatar'>
              {renderUserAvatar()}
              </div>
            </div>
            <div className='chatcontact-right'>
              <div>
                <p>{data[0]}</p>
                <p>{data[1]}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Chatcontact