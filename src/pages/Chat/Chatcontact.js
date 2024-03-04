import React, { useState, useEffect, useContext } from 'react';
import './Chatcontact.css';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { PrefixUrlContext } from "../..";

function Chatcontact({ setChatNumber }) {
  const backendURL = useContext(PrefixUrlContext);
  const [contact, setContact] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(backendURL + '/lscchat/v1.0/chatcontact', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        console.log(result);
        setContact(result);
      } catch (error) {
        console.error('Error fetching contact details:', error);
      }
    };

    fetchData();
  }, [backendURL]);

  useEffect(() => {
    const call = async () => {
      try {
        const response = await fetch(backendURL + '/lscchat/v1.0/sessionvalues', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        console.log(result);
        setUserDetails({
          userRole: result.userRole,
          companyId: result.company_id,
          depId: result.dep_id,
          unitId: result.unit_id
        });
      } catch (error) {
        console.error('Error fetching contact details:', error);
      }
    };

    call();
  }, [backendURL]);

  useEffect(() => {
    if (userDetails && stompClient === null) {
      const socket = new SockJS(backendURL + "/ws");
      const stomp = over(socket);

      stomp.connect({}, (frame) => {
        console.log("Connected to the server", frame);
        setStompClient(stomp);
        
        // Set the companyId dynamically in the subscription path
        const subscriptionPath = `/user/${userDetails.companyId+""+userDetails.depId+""+userDetails.unitId}/private`;
        stomp.subscribe(subscriptionPath, onPrivateMessage);
      }, (error) => {
        console.error("WebSocket error:", error);
      });
    }

    return () => {
      if (stompClient) {
        stompClient.disconnect();
        setStompClient(null);
      }
    };
  }, [userDetails, backendURL, stompClient]);

  const onPrivateMessage = (payload) => {
    const payloadData = JSON.parse(payload.body);
    console.log("Received Message:", payloadData);
    setContact(payloadData);
  };

  const chatNumber = (number, name) => {
    setChatNumber({ mobileNo: number, name: name });
    updateContact(number, {notRead: "0", lastMessage: ""})
    //Update in database
    updateReadAll(number);
  };
  const updateReadAll = async (number) => {
    try {
      const response = await fetch(backendURL + '/lscchat/v1.0/readedall/'+number, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ readed: 1 })
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(result);
      setContact(result);
    } catch (error) {
      console.error('Error fetching contact details:', error);
    }
  }
  const updateContact = (number, updatedValues) => {
    setContact(precContact => (
      precContact.map(contact => {
        if(contact.mobileNumber === number) {
          return {...contact, ...updatedValues}
        }
        return contact;
      })
    ));
  }
  const renderDate = (date) => {
    const messageDate = new Date(date);
    const today = new Date();

    if (
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      return new Date(date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    } else {
      return new Date(date).toLocaleDateString('en-US');
    }
  };

  return (
    <div className='main-chatcontact'>
      <ul className='chatcontact-card'>
        {contact.map((data, index) => (
          <li key={index} onClick={() => chatNumber(data.mobileNumber, data.name)}>
            <div className='chatcontact-left'>
              <div className='chatcontact-avatar'>
                <div style={{ backgroundColor: "ghostwhite", color: "var(--first-color)" }}>
                  <i className="fa-duotone fa-user"></i>
                </div>
              </div>
            </div>
            <div className='chatcontact-right'>
              <div>
                <div className='line-1'>
                  <div className='contact-name'>{data.name == ""? data.mobileNumber : data.name}</div>
                  <div className='contact-count'><span className={data.notRead == 0 ? "" : "count-design"}>{data.notRead == 0 ? "" : data.notRead}</span></div>
                </div>
                <div className='line-2'>
                  <div className='last-message'>{data.lastMessage == 0 ? "Tap to view Message" : data.lastMessage}</div>
                  <div className='contact-date-time' ><span className={data.notRead == 0 ? "" : "date-time-color"}>{renderDate(data.lastDateTime)}</span></div>
                </div> 
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Chatcontact;
