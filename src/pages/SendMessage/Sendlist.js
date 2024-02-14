import React from 'react'
import './Sendlist.css'
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { PrefixUrlContext } from "../..";

function Sendlist() {
    const backendURL = useContext(PrefixUrlContext);
    const [list, setList] = useState([]);
    //Fetching data onload
    useEffect(() => {
        fetchContactDetails();
    }, []);

    const fetchContactDetails = async () => {
        try {
            const response = await fetch(backendURL+'/lscchat/v1.0/getsendlist', {
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
            console.log(result);
            setList(result)
        } catch (error) {
            console.error('Error fetching contact details:', error);
        }
    };
    let jsonData = [
        {
            "templateName": "apprenticeship",
            "date": "2024-01-19T06:51:41.000+00:00",
            "status": 0,
            "total": "1",
            "send": "1",
            "delivered": "1",
            "read": "1",
            "reply": "1",
            "notSend": "0",
            "failed":"1"
        }
    ]
    function formatDate(dateString) {

        const date = new Date(dateString);

        const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

        // console.log(formattedDate);
        return formattedDate;
    }
    return (
        <div className='main-sendlist'>
            <div className="container">
                <div className='details-header'>
                    <div className='details-header-name'>
                        <p>Message</p>
                        <p>Send List</p>
                    </div>
                    <div className='details-header-btn'>
                        <button className='payroll-btn-1'><i class="fa-regular fa-bars-filter"></i> Filter</button>
                        <button className='payroll-btn-1'><i class="fa-regular fa-arrow-right-from-bracket" style={{ transform: 'rotate(270deg)' }}></i> Export</button>
                    </div>
                </div>
                {list.map((data, index) => (
                <details>
                    <summary key={index}>
                        <div>
                            <span>{data.templateName}</span>
                            <span>{formatDate(data.date)}</span>
                            <span className='status-span'><span className={(true) ? 'status status-success' : 'status status-failed'}><span className='dot'>&#183;</span> {(true) ? 'success' : 'failed'}</span></span>
                        </div>
                    </summary>
                    <div class="content">
                        <div className="container-fluid" style={{ marginTop: '20px' }}>
                            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4">
                                <div className="col">
                                    <div className="card radius-10 border-start border-0 border-3 border-info">
                                        <a href="./social_media_leads.php" className="no-underline">
                                            <div className="card-body" style={{ padding: '1.25rem', border: 'none', margin: '0' }}>
                                                <div className="d-flex align-items-center">
                                                    <div>
                                                        <p className="mb-0 text-secondary">Total</p>
                                                        <h4 className="my-1 text-info">{data.total}</h4>
                                                    </div>
                                                    <div className="widgets-icons-2 rounded-circle bg-gradient-scooter text-white ms-auto">
                                                        <i class="fa-solid fa-address-card"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card radius-10 border-start border-0 border-3 border-info">
                                        <a href="./social_media_leads.php" className="no-underline">
                                            <div className="card-body" style={{ padding: '1.25rem', border: 'none', margin: '0' }}>
                                                <div className="d-flex align-items-center">
                                                    <div>
                                                        <p className="mb-0 text-secondary">Sent</p>
                                                        <h4 className="my-1 text-info t-c-2">{data.send}</h4>
                                                    </div>
                                                    <div className="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto">
                                                    <i class="fa-solid fa-paper-plane-top"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card radius-10 border-start border-0 border-3 border-info">
                                        <a href="./social_media_leads.php" className="no-underline">
                                            <div className="card-body" style={{ padding: '1.25rem', border: 'none', margin: '0' }}>
                                                <div className="d-flex align-items-center">
                                                    <div>
                                                        <p className="mb-0 text-secondary">Delivered</p>
                                                        <h4 className="my-1 text-info t-c-2">{data.delivered}</h4>
                                                    </div>
                                                    <div className="widgets-icons-2 rounded-circle bg-delivered text-white ms-auto">
                                                    <i class="fa-solid fa-paper-plane-top"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                
                                <div className="col">
                                    <div className="card radius-10 border-start border-0 border-3 border-info">
                                        <a href="./social_media_leads.php" className="no-underline">
                                            <div className="card-body" style={{ padding: '1.25rem', border: 'none', margin: '0' }}>
                                                <div className="d-flex align-items-center">
                                                    <div>
                                                        <p className="mb-0 text-secondary">Read</p>
                                                        <h4 className="my-1 text-info t-c-3">{data.read}</h4>
                                                    </div>
                                                    <div className="widgets-icons-2 rounded-circle  bg-gradient-blooker text-white ms-auto">
                                                    <i class="fa-solid fa-badge-check"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card radius-10 border-start border-0 border-3 border-info">
                                        <a href="./social_media_leads.php" className="no-underline">
                                            <div className="card-body" style={{ padding: '1.25rem', border: 'none', margin: '0' }}>
                                                <div className="d-flex align-items-center">
                                                    <div>
                                                        <p className="mb-0 text-secondary">Reply</p>
                                                        <h4 className="my-1 text-info t-c-4">{data.reply}</h4>
                                                    </div>
                                                    <div className="widgets-icons-2 rounded-circle bg-pink text-white ms-auto">
                                                    <i class="fa-solid fa-reply-all"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card radius-10 border-start border-0 border-3 border-info">
                                        <a href="./social_media_leads.php" className="no-underline">
                                            <div className="card-body" style={{ padding: '1.25rem', border: 'none', margin: '0' }}>
                                                <div className="d-flex align-items-center">
                                                    <div>
                                                        <p className="mb-0 text-secondary">Not Sent</p>
                                                        <h4 className="my-1 text-info t-c-5">{data.notSend}</h4>
                                                    </div>
                                                    <div className="widgets-icons-2 rounded-circle bg-gradient-bloody text-white ms-auto">
                                                    <i class="fa-solid fa-circle-exclamation"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </details>
                ))}
            </div>
        </div>
    )
}

export default Sendlist