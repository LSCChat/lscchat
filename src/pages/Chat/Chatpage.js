import React from 'react'
import { useContext, useEffect, useState, useRef } from 'react';
import { TokenContext } from '../..';
import './Chatpage.css';
import { PrefixUrlContext } from "../..";
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { currentDateTime } from '../../Functions/currentDateTime'

var stompClient = null;
function Chatpage({ chatNumber }) {
    const mobileNo = chatNumber.mobileNo;
    const backendURL = useContext(PrefixUrlContext);
    const token = useContext(TokenContext);
    const [message, setMessage] = useState([]);
    const [userData, setUserData] = useState({
        senderId: "917845810780",
        reciverId: "",
        messageId: "",
        type: 1,
        messageType: "1",
        message: ""
    })

    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            scrollToBottom();
        }
    }, [message]);

    const scrollToBottom = () => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }

    console.log(userData.senderId);
    const fetchChat = async () => {
        try {
            const response = await fetch(backendURL + '/lscchat/v1.0/chat', {
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
            setMessage(result)
        } catch (error) {
            console.error('Error fetching contact details:', error);
        }
    };
    //Initial data fetching
    useEffect(() => {
        fetchChat();
    }, [chatNumber])
    //WebSocket implementation
    //Connection to websocket
    const connect = () => {
        let sock = new SockJS(backendURL + "/ws");
        stompClient = over(sock);
        stompClient.connect({}, onConnect, onError);
    }

    const onConnect = (frame) => {
        console.log("Connected to the serever", frame);
        console.log("Mobile Number:"+ mobileNo);
        stompClient.subscribe('/user/' + mobileNo + '/private', onPrivateMessage);
    }
    // Call the connect function on component mount
    useEffect(() => {
        connect();
    }, [chatNumber]);

    //Get Message from Web Socket
    const onPrivateMessage = (payload) => {
        let payloadData = JSON.parse(payload.body);
        console.log("Recive Message");
        console.log(payloadData);
        setMessage(prevMessages => [...prevMessages, payloadData]);

    }

    //Sending Message to Web Socket
    useEffect(() => {
        if (stompClient && userData.message && userData.messageId) {
            stompClient.send("/app/private-message", {}, JSON.stringify(userData));
            //Add message in message list
            let newMessage = {
                dateTime: currentDateTime(),
                message: userData.message,
                messageId: null,
                messageType: "2",
                type: 1
            }
            setMessage(prevMessages => [...prevMessages, newMessage]);
        }
    }, [userData]);


    const onError = (err) => {
        console.log("Error: ", err)
    }
    const sendMessage = async () => {

        const headers = {
            Authorization: token, // Replace with your access token
            'Content-Type': 'application/json'
        };
        let text = document.getElementById("message").value;
        console.log("Message:" + text)
        const messageData = {
            messaging_product: "whatsapp",
            to: chatNumber.mobileNo, // Replace with the recipient's phone number in international format
            type: "text",
            text: {
                body: text
            }
        };

        if (text != "" && text != " ") {
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

                const updatedUserData = { ...userData, reciverId: mobileNo, message: text, messageId: responseData.messages[0].id };
                //After seting value userData it will call the UseEffect to the Sending Message to Web Socket
                setUserData(updatedUserData);
                document.getElementById("message").value = "";

            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    }

    //Avatar
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

    // time format
    const getHoursAndMinutes = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert hours to 12-hour format

        return `${formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    };
    return (
        <div className='main-chatpage'>
            {chatNumber.mobileNo &&
                <div className='chat-container'>
                    <div className='chats-header'>
                        <div className='chatcontact-avatar'>
                            {/* {renderUserAvatar()} */}
                            <div style={{ backgroundColor:"ghostwhite", color: "var(--first-color)" }}>
                                <i class="fa-duotone fa-user"></i>
                            </div>
                        </div>
                        <div>
                            <div className='chat-name'>{chatNumber.name == ""? chatNumber.mobileNo : chatNumber.name}</div>
                            <div className='chat-number'>{chatNumber.name == ""? "" : chatNumber.mobileNo}</div>
                        </div>
                    </div>
                    <div className='chats' ref={chatContainerRef}>
                        {message.map((data, index) => (
                            <div key={index} className={data.type == 1 ? 'right' : 'left'}>
                                <div className="data-msg"><span>{data.message}</span><span className='data-time'>{getHoursAndMinutes(data.dateTime)}</span></div>
                            </div>
                        ))}
                    </div>
                    <div className='sent-message'>
                        <textarea rows={1} id='message' placeholder='Message'></textarea>
                        <button onClick={() => sendMessage()}><i class="fa-solid fa-paper-plane-top"></i></button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Chatpage