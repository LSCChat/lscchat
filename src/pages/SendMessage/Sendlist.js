import React from 'react'
import './Sendlist.css'
import { useState, useEffect } from 'react';
function Sendlist() {
    const [list, setList] = useState([]);
    //Fetching data onload
    useEffect(() => {
        fetchContactDetails();
    }, []);

    const fetchContactDetails = async () => {
        try {
            const response = await fetch("http://localhost:8080/lscchat/v1.0/getsendlist", {
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
            "template_name": "Hello_world",
            "date": "01-01-2024",
            "status": "0",
            "total": "40",
            "send": "39",
            "read": "30",
            "reply": "20",
            "not_send": "1",
            "last_motified": "2024-01-01"
        },
        {
            "template_name": "colte_poster",
            "date": "01-01-2024",
            "status": "1",
            "total": "40",
            "send": "39",
            "read": "30",
            "reply": "20",
            "not_send": "1",
            "last_motified": "2024-01-01"
        },
        {
            "template_name": "edc",
            "date": "01-01-2024",
            "status": "0",
            "total": "40",
            "send": "39",
            "read": "30",
            "reply": "20",
            "not_send": "1",
            "last_motified": "2024-01-01"
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
                            <span>{data.message}</span>
                            <span>{formatDate(data.create_date)}</span>
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
                                                        <h4 className="my-1 text-info">{0}</h4>
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
                                                        <p className="mb-0 text-secondary">Delivered</p>
                                                        <h4 className="my-1 text-info t-c-2">{0}</h4>
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
                                                        <p className="mb-0 text-secondary">Send</p>
                                                        <h4 className="my-1 text-info t-c-2">{0}</h4>
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
                                                        <p className="mb-0 text-secondary">Read</p>
                                                        <h4 className="my-1 text-info t-c-3">{0}</h4>
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
                                                        <h4 className="my-1 text-info t-c-4">{0}</h4>
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
                                                        <p className="mb-0 text-secondary">Not Send</p>
                                                        <h4 className="my-1 text-info t-c-5">{0}</h4>
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