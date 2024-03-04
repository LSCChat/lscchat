import React, { useEffect, useState } from 'react'
import './Persion.css'

import SockJS from 'sockjs-client';
import { over } from 'stompjs';

var stompClient =null;
function Persion1() {
    const [message, setMessage] = useState([]);
    const [userData, setUserData] = useState({
        senderId: "919626974940",
        reciverId: "919943714360",
        type: 1,
        messageType: "1",
        message: ""
    })
    useEffect(() => {
        let json = [
            {
                senderId: "919626974940",
                reciverId: "919943714360",
                messageId: 305,
                type: 1,
                messageType: "1",
                message: "Hello Raj",
                dateTime: "2024-02-14T12:01:56.710+00:00"
            },
            {
                senderId: "919943714360",
                reciverId: "919626974940",
                messageId: 306,
                type: 2,
                messageType: "1",
                message: "Hello Gokul",
                dateTime: "2024-02-14T12:01:56.710+00:00"
            }
        ];
        setMessage(json)
    }, [])

    const addMessage = (e) => {
        let val = e.target.value;
        setUserData({...userData, "message":val});
        console.log(userData);
    }

    const connect = () => {
        console.log("calling connect");
        let sock = new SockJS("http://localhost:8081/ws");
        stompClient = over(sock);
        stompClient.connect({}, onConnect, onError);
    }
    
    const onConnect = (frame) => {
        console.log("Connected to server", frame);
        stompClient.subscribe('/user/' + userData.senderId + '/private', onPrivateMessage);
    }
    
    const onPrivateMessage = (payload) => {
        var payloadData = JSON.parse(payload.body);
        console.log(payloadData);
        var updatePayloadData = {...payloadData, type:2}
        setMessage(prevMessages => [...prevMessages, updatePayloadData]);
        
    }
    
    const sendPrivateValue=()=>{
        if (stompClient) {
            let newSendMessage = {
                senderId: "919943714360",
                reciverId: "919626974940",
                messageId: 306,
                type: 1,
                messageType: "1",
                message: userData.message,
                dateTime: "2024-02-14T12:01:56.710+00:00"
            }
            document.getElementById('message').value="";
            setUserData({...userData, "message":""});
            setMessage(prevMessages => [...prevMessages, newSendMessage]);
            stompClient.send("/app/private-message", {}, JSON.stringify(userData));
        }
    }
    const onError = (err) => {
        console.log("Error: ");
        console.log(err);
    }
    
    // Call the connect function on component mount
    useEffect(() => {
        connect();
    }, []);
    
    

    return (
        <div className='persion'>
            <div className='display-chat'>
                {message.map((data, index) => (
                    <div className={data.type === 1 ? "right chat" : "left chat"} key={index}><span>{data.message}</span></div>
                ))}

            </div>
            <div className='sent-btn'>
                <input type='text' name='message' className='message' id='message' onChange={(e)=>addMessage(e)}/>
                <button onClick={sendPrivateValue}>Send</button>
            </div>
        </div>
    )
}

export default Persion1