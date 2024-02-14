import React from 'react'
import './Contacts.css'
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { PrefixUrlContext } from '../..';
function Contacts() {
    const backendURL = useContext(PrefixUrlContext);
    const [contact, setContact] = useState([]);
    //Fetching data onload
    useEffect(() => {
        fetchContactDetails();
    }, []);

    const fetchContactDetails = async () => {
    try {
        const response = await fetch(backendURL+'/lscchat/v1.0/contactdetails', {
        method: 'GET',
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
    function formatDate(dateString) {
  
        const date = new Date(dateString);

        const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

        console.log(formattedDate); 
        return formattedDate;
      }
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
            "mobile": "919626974940",
            "created": "2024-01-01",
            "last_motified": "2024-01-01"
        },
        {
            "name": "Pradhipa",
            "location": "Tirunelveli",
            "mobile": "919626974940",
            "created": "2024-01-01",
            "last_motified": "2024-01-01"
        }
    ]
    // List of background colors
    const colors = ['#ff9999', '#99ff99', '#9999ff', '#ffff99', '#ff99ff', '#99ffff', '#ffe4c4', '#ffd700', '#40e0d0'];
    return (
        <div className='main-contacts'>
            <div className='content-container'>
                <div className='details-row w3-animate-bottom'>
                    <div className="card-2">
                        <div className='details-header'>
                            <div className='details-header-name'>
                                {/* <p>contact List</p> */}
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
                                        <th>S.No</th>
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
                                            <td>{index+1}</td>
                                            <td className='profile'>
                                                <div className="profile-img-div"><span className="profile-img" style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}><span>{data.fullname.charAt(0).toUpperCase()}</span></span></div>
                                                <div className='profile-info'>
                                                    <p className='profile-name'>{data.fullname}</p>
                                                    <p className='profile-role'>{data.location}</p>
                                                </div>
                                            </td>
                                            <td>{data.mobile_no}</td>
                                            <td>{formatDate(data.create_date)}</td>
                                            <td>{(data.update_date==null)?'No Modify':formatDate(data.update_date)}</td>
                                            <td className='action-td'><i class="fa-solid fa-pen-to-square edit-icon"></i><i class="fa-solid fa-trash delete-icon"></i></td>
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

export default Contacts