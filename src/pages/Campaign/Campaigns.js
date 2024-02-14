import React from 'react'
import './Campaigns.css'
import { useState, useEffect } from 'react';
import formatDate from '../../Functions/date';
import formatTime from '../../Functions/time';
import { useContext } from 'react';
import { PrefixUrlContext } from "../..";
function Campaigns() {
    const backendURL = useContext(PrefixUrlContext);
    const [contact, setContact] = useState([]);
    //Fetching data onload
    useEffect(() => {
        fetchContactDetails();
    }, []);

    const fetchContactDetails = async () => {
        try {
            const response = await fetch(backendURL+'/lscchat/v1.0/getpendinglist', {
                method: 'GET',
                credentials: 'include', // Ensure cookies are sent for session management
                headers: {
                    'Content-Type': 'application/json', // Specify content type for clarity
                }
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
    let jsonData = [
        {
            "name": "Gokulraj",
            "location": "Salem",
            "mobile": "919626974940",
            "created": "2024-01-01",
            "last_motified": "2024-01-01"
        }
    ]
    // List of background colors
    const colors = ['#ff9999', '#99ff99', '#9999ff', '#ffff99', '#ff99ff', '#99ffff', '#ffe4c4', '#ffd700', '#40e0d0'];
    return (
        <div className='main-pending'>
            <div className='content-container'>
                <div className='details-row w3-animate-bottom'>
                    <div className="card-2">
                        <div className='details-header'>
                            <div className='details-header-name'>
                                {/* <p>contact List</p> */}
                                <p>Pending Details</p>
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
                                        <th>S.No</th>
                                        <th>Campaign</th>
                                        <th>Template</th>
                                        <th>Created By</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>View</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contact.map((data, index) => (
                                        <tr key={index} className='bottom-line'>
                                            <td>{index + 1}</td>
                                            <td className='profile'>
                                                <div className="profile-img-div"><span className="profile-img" style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}><span>{data[1].charAt(0).toUpperCase()}</span></span></div>
                                                <div className='profile-info'>
                                                    <p className='profile-name'>{data[1]}</p>
                                                    <p className='profile-role'><i class="fa-duotone fa-chart-simple"></i> approvel process</p>
                                                </div>
                                            </td>
                                            <td>{data[2]}</td>
                                            <td>{data[3]}</td>
                                            <td>{formatDate(data[4])}</td>
                                            <td>{formatTime(data[4])}</td>
                                            <td className='action-td'>
                                                <button className='button-2'>View<i class="fa-duotone fa-eye"></i></button>
                                            </td>
                                            <td>
                                                <div className='button-row'>
                                                    <button className='button-2 button-green'>Approve<i class="fa-duotone fa-badge-check"></i></button>
                                                    <button className='button-2 button-red'>Reject<i class="fa-duotone fa-octagon-xmark"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Campaigns