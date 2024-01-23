import React, { useEffect } from 'react'
import { useState } from 'react';
import './Send.css';
import WhatsappPreview from '../WhatsappPreview/WhatsappPreview';
import Success from '../Alert/Success';

function Send() {
    const headers = {
        Authorization: 'Bearer EAAEwXBNVMRoBO8RBWBBb2hWvUAkZAIhwsljqPVvAAcYmH76ZAQZBatrE2xBwii0sALTZBXyh84uAQs4ZACTN04j8IdK5fWFAK3wrOZCDkZCZCy0ZAXzPPQNGYofdbQOK4ZAVBFJkpgmfVjOe2OhZBX9Ijvx3md01rqaRqnszWYFDb1ixuxm8GLBHM121G87nFgfrrWR', // Replace with your access token
        'Content-Type': 'application/json'
    };
    console.log("component is rendering");
    let listID = 0;
    const [selectedRows, setSelectedRows] = useState([]);
    const [type, setType] = useState();
    const [message, setMessage] = useState('Choose template or text to see the Preview');
    const [success, setSuccess] = useState(false);
    const [isMasterCheckboxChecked, setIsMasterCheckboxChecked] = useState(false);
    const [contact, setContact] = useState([]);
    //Fetching data onload
    useEffect(() => {
        fetchContactDetails();
    }, []);

    const fetchContactDetails = async () => {
        try {
            const response = await fetch("http://localhost:8080/lscchat/v1.0/contactdetails", {
                method: 'GET',
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
            // console.log(result);
            setContact(result)
        } catch (error) {
            console.error('Error fetching contact details:', error);
        }
    };
    let jsonData = [
        {
            "name": "Gokulraj",
            "location": "Salem",
            "mobile": "919626974940",
            "created": "2024-01-01",
            "last_motified": "2024-01-01"
        },
        {
            "name": "Anitha",
            "location": "Chennai",
            "mobile": "917358464774",
            "created": "2024-01-01",
            "last_motified": "2024-01-01"
        },
        {
            "name": "Vimal",
            "location": "Chennai",
            "mobile": "919092182181",
            "created": "2024-01-01",
            "last_motified": "2024-01-01"
        },
        {
            "name": "Pradhipa",
            "location": "Tirunelveli",
            "mobile": "919688891170",
            "created": "2024-01-01",
            "last_motified": "2024-01-01"
        }
    ]

    const handleCheckboxChange = (index) => (event) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setSelectedRows(prevRows => [...prevRows, contact[index]]);
            console.log("if : ");
            console.log(selectedRows);
            // console.log(contact[index]);
        } else {
            const updatedSelection = selectedRows.filter((_, i) => i !== index);
            setSelectedRows(updatedSelection);
            console.log("else : ");
            // console.log(selectedRows);
        }
    };

    const handleMasterCheckboxChange = (event) => {
        setIsMasterCheckboxChecked(!isMasterCheckboxChecked);
        if (!isMasterCheckboxChecked) {
            setSelectedRows([...contact]);
        } else {
            setSelectedRows([]);
        }
    };

    const handleSendData = () => {
        sendMessages(selectedRows);
    };

    const sendMessage = async (data) => {
        console.log("Data:")
        console.log(data);
        let type = document.getElementById('type').value;
        let template = document.getElementById('template').value;
        let text = document.getElementById('text').value;
        let messageData;
        console.log("Send Mobile Number :"+data.mobile_no);
        // console.log(data);
        if (type == 1) {
            messageData = {
                messaging_product: "whatsapp",
                to: data.mobile_no, // Replace with the recipient's phone number in international format
                type: "text",
                text: {
                    body: text
                }
            };
        } else {
            if (template == 'apprenticeship') {
                messageData = {
                    "messaging_product": "whatsapp",

                    "to": data.mobile_no,
                    "type": "template",
                    "template": {
                        "name": "apprenticeship",
                        "language": {
                            "code": "en_US"
                        },
                        "components": [
                            {
                                "type": "header",
                                "parameters": [
                                    {
                                        "type": "image",
                                        "image": {
                                            "link": "https://lsc-india.org/Whatsapp%20API/images/Apprentice%203-01%20(1).jpg"
                                        }
                                    }
                                ]
                            },

                            {
                                "type": "button",
                                "sub_type": "url",
                                "index": 1,
                                "parameters": [
                                    {
                                        "type": "text",
                                        "text": "Visit Website"
                                    }

                                ]
                            }
                        ]
                    }
                }
            } else if(template == 'apprenticeship_organization'){
                messageData = {
                    "messaging_product": "whatsapp",

                    "to": data.mobile_no,
                    "type": "template",
                    "template": {
                        "name": "apprenticeship_organization",
                        "language": {
                            "code": "en_US"
                        },
                        "components": [
                            {
                                "type": "header",
                                "parameters": [
                                    {
                                        "type": "image",
                                        "image": {
                                            "link": "https://lsc-india.org/Whatsapp%20API/images/Apprenticeship poster-02-02-02.png"
                                        }
                                    }
                                ]
                            },

                            {
                                "type": "button",
                                "sub_type": "url",
                                "index": 1,
                                "parameters": [
                                    {
                                        "type": "text",
                                        "text": "Visit Website"
                                    }

                                ]
                            }
                        ]
                    }
                }
            }
            
            
            else {
                messageData = {
                    messaging_product: "whatsapp",
                    to: data.mobile_no, // Replace with the recipient's phone number in international format
                    type: "template",
                    template: {
                        name: template,
                        language: {
                            code: "en_US"
                        }
                    }
                };
            }

        }


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

            let messageContent = ""
            if (type == 1) {
                messageContent=text;
            } else {
                messageContent=template;
            }
            //API for message sended
            try {
                const response = await fetch('http://localhost:8080/lscchat/v1.0/message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message_id: responseData.messages[0].id,
                        message_type: type,
                        message: messageContent,
                        receive_id: "919626974940",
                        send_id: responseData.contacts[0].wa_id,
                        send_list_id: listID
                    }),
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                // console.log('Response from server:', data);
            } catch (error) {
                console.error('Error:', error.message);
            }

        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const sendMessages = async (value) => {
        console.log("value:")
        console.log(value);
        //create a send List
        let type = document.getElementById('type').value;
        let template = document.getElementById('template').value;
        let text = document.getElementById('text').value;
        let sendlist;
        if (type == 1) {
            sendlist = {
                message_type: 1,
                message: text
            }
        } else {
            sendlist = {
                message_type: 2,
                message: template
            }
        }
        try {
            const response = await fetch('http://localhost:8080/lscchat/v1.0/addsendlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sendlist),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            listID = data.id;

            //Calling the message sending API

            const sendMessagePromises = value.map((value) => {
                sendMessage(value)
            });

            try {
                await Promise.all(sendMessagePromises);
                setSuccess(true);
                // console.log(sendMessagePromises);
            } catch (error) {
                console.error('Error sending messages:', error);
            }

            // console.log('Response from server:', data);
        } catch (error) {
            console.error('Error:', error.message);
        }


    };


    function chooseType() {
        setType(document.getElementById("type").value);
    }

    function typeing() {
        setMessage(document.getElementById('text').value)
    }

    function formatDate(dateString) {

        const date = new Date(dateString);

        const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

        // console.log(formattedDate);
        return formattedDate;
    }

    function printMsg() {
        console.log("From Print: ");
        console.log(selectedRows);
    }

    // List of background colors
    const colors = ['#ff9999', '#99ff99', '#9999ff', '#ffff99', '#ff99ff', '#99ffff', '#ffe4c4', '#ffd700', '#40e0d0'];

    return (
        <div className='main-send'>
            <div className='two-grid'>
                <div className='input-continer input-continer-v w3-animate-left'>
                    <div className='input-field'>
                        <label for="type">Select Type</label>
                        <select name='type' id="type" onChange={chooseType}>
                            <option value={0} style={{ display: 'none' }}>--select Type--</option>
                            <option value={1}>Text</option>
                            <option value={2}>Templates</option>
                        </select>
                    </div>
                    <div className={type == 1 ? 'input-field' : 'display-none'}>
                        <label for="text">Select Template</label>
                        <textarea id="text" name="text" rows="4" cols="50" onChange={typeing}></textarea>
                    </div>
                    <div className={type == 2 ? 'input-field' : 'display-none'}>
                        <label for="template">Select Template</label>
                        <select name='template' id="template">
                            <option value={'hello_world'}>hello_world</option>
                            <option value={'colte_text3'}>colte_text3</option>
                            <option value={'apprenticeship'}>apprenticeship</option>
                            <option value={'apprenticeship_organization'}>apprenticeship_organization</option>
                        </select>
                    </div>
                    <div className='input-field btn-in'>
                        <button className='btn-1' onClick={handleSendData}>Send <i class="fa-solid fa-paper-plane-top"></i></button>
                    </div>
                </div>
                <div className='w3-animate-right'>
                    <WhatsappPreview message={message} />
                </div>

            </div>

            <div className='content-container'>
                <div className='details-row w3-animate-bottom'>
                    <div className="card-2">
                        <div className='details-header'>
                            <div className='details-header-name'>
                                <p>Select contact</p>
                                <p>Contacts Details</p>
                            </div>
                            <div className='details-header-btn'>
                                <button className='payroll-btn-1'><i class="fa-regular fa-bars-filter"></i> Filter</button>
                                <button className='payroll-btn-1'><i class="fa-regular fa-arrow-right-from-bracket" style={{ transform: 'rotate(270deg)' }}></i> Export</button>
                            </div>
                        </div>
                        <div className='details-body'>
                            <table className='details-table'>
                                <thead>
                                    <tr>
                                        <th className='select-box-td'><input type='checkbox' className='select-box' onChange={handleMasterCheckboxChange} /></th>
                                        <th>Name</th>
                                        <th>Mobile No</th>
                                        <th>Created</th>
                                        <th>Last Motified</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contact.map((data, index) => (
                                        <tr key={index}>
                                            <td className='select-box-td'>
                                                <input type='checkbox' className='select-box' onChange={handleCheckboxChange(index)} checked={selectedRows.includes(contact[index])} />
                                            </td>
                                            <td className='profile'>
                                                <div className="profile-img-div"><span className="profile-img" style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}><span>{data.fullname.charAt(0).toUpperCase()}</span></span></div>
                                                <div className='profile-info'>
                                                    <p className='profile-name'>{data.fullname}</p>
                                                    <p className='profile-role'>{data.location}</p>
                                                </div>
                                            </td>
                                            <td>{data.mobile_no}</td>
                                            <td>{formatDate(data.create_date)}</td>
                                            <td>{(data.update_date == null) ? 'No Modify' : formatDate(data.update_date)}</td>
                                            <td className='action-td'><i class="fa-solid fa-pen-to-square edit-icon"></i><i class="fa-solid fa-trash delete-icon"></i></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
            {/* <button onClick={printMsg}>Print</button> */}
            {success && <Success title={"Successfully sent"} description={"Messages sent"} button2={"Go to sent list"} button2URL={"/sendlist"} />}
        </div>
    )
}

export default Send