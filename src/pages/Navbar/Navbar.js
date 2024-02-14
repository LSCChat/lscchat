import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import { UserContext } from '../..';
import { PrefixUrlContext } from "../..";
// import { getSessionValue } from '../API/SessionAPI';

function Navbar() {
    const backendURL = useContext(PrefixUrlContext);
    const { userDetails, setUserDetails } = useContext(UserContext);

    if (Object.keys(userDetails).length === 0) {
        const call = async () => {
            const getSessionValue = async() => {
                try{
                    const response = await fetch(backendURL+'/lscchat/v1.0/sessionvalues', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-type': 'application/json'
                        }
                    });
            
                    if(!response.ok){
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
                    }
                    const result = await response.json();
                    console.log(result);
                    return {userRole: result.userRole}
                } catch(error) {
                    console.error('Error fetching contact details: '+ error)
                }
            }
            setUserDetails(await getSessionValue());
        }
        call();
    }
    
    useEffect(() => {
        
        const handleArrowClick = (e) => {
            const arrowParent = e.currentTarget.parentElement.parentElement; // Selecting main parent of arrow
            arrowParent.classList.toggle('showMenu');
            console.log("calling fun")
        };

        const handleSidebarToggle = () => {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('close');
        };

        const arrows = document.querySelectorAll('.arrow');
        arrows.forEach((arrow) => {
            arrow.addEventListener('click', handleArrowClick);
            console.log("im from")
        });

        const sidebarBtn = document.querySelector('.bar');
        sidebarBtn.addEventListener('click', handleSidebarToggle);

        return () => {
            arrows.forEach((arrow) => {
                arrow.removeEventListener('click', handleArrowClick);
            });
            sidebarBtn.removeEventListener('click', handleSidebarToggle);
        };
    }, [userDetails]);
    return (
        <nav>
            <div class="sidebar">
                <div class="logo-details">
                    <i class="fa-solid fa-message-lines"></i>
                    <span class="logo_name">LSC Chat</span>
                    <i class="fa-solid fa-arrow-right-from-line bar"></i>
                </div>
                <ul class="nav-links">
                    <li>
                        <Link to="#">
                            <i class='bx bx-grid-alt' ></i>
                            <span class="link_name">Dashboard</span>
                        </Link>
                        <ul class="sub-menu blank">
                            <li><Link class="link_name" to="#">Dashboard</Link></li>
                        </ul>
                    </li>
                    <li>
                        <div class="iocn-link">
                            <Link to="#">
                                <i class='bx bx-collection' ></i>
                                <span class="link_name">Templates</span>
                            </Link>
                            <i class='bx bxs-chevron-down arrow' ></i>
                        </div>
                        <ul class="sub-menu">
                            <li><Link class="link_name" to="#">Message Templates</Link></li>
                            <li><Link to="#"><span class="fa-solid fa-square-plus"></span>Create New</Link></li>
                            <li><Link to="#"><span class="fa-solid fa-layer-group"></span>Templates</Link></li>
                        </ul>
                    </li>
                    <li>
                        <div class="iocn-link">
                            <Link to="#">
                                <i class="fa-solid fa-address-book"></i>
                                <span class="link_name">campaign</span>
                            </Link>
                            <i class='bx bxs-chevron-down arrow' ></i>
                        </div>
                        <ul class="sub-menu">
                            <li><Link class="link_name" to="#">Contacts</Link></li>
                            <li><Link to="createcampaign"><span class="fa-solid fa-user-plus"></span> Create Campaign</Link></li>
                            <li><Link to="campaigns"><span class="fa-solid fa-magnifying-glass-chart"></span> Campaigns</Link></li>
                        </ul>
                    </li>
                    <li>
                        <div class="iocn-link">
                            <Link to="#">
                                <i class="fa-solid fa-address-book"></i>
                                <span class="link_name">Contacts</span>
                            </Link>
                            <i class='bx bxs-chevron-down arrow' ></i>
                        </div>
                        <ul class="sub-menu">
                            <li><Link class="link_name" to="#">Contacts</Link></li>
                            <li><Link to="addcontacts"><span class="fa-solid fa-user-plus"></span> Create Contacts</Link></li>
                            <li><Link to="contacts"><span class="fa-solid fa-address-card"></span> Contacts</Link></li>
                        </ul>
                    </li>
                    <li>
                        <div class="iocn-link">
                            <Link to="#">
                                <i class="fa-solid fa-message-dots"></i>
                                <span class="link_name">Send Message</span>
                            </Link>
                            <i class='bx bxs-chevron-down arrow' ></i>
                        </div>
                        <ul class="sub-menu">
                            <li><Link class="link_name" to="#">Send Message</Link></li>
                            <li><Link to="send"><span class="fa-solid fa-paper-plane-top"></span> Send</Link></li>
                            <li><Link to="sendlist"><span class="fa-solid fa-list"></span>Send List</Link></li>
                        </ul>
                    </li>
                    {(userDetails.userRole === 1 || userDetails.userRole === 2 || userDetails.userRole === 3) && (
                        <li>
                            <div class="iocn-link">
                                <Link to="#">
                                    <i class="fa-sharp fa-solid fa-badge-check"></i>
                                    <span class="link_name">Approval Requests</span>
                                </Link>
                                <i class='bx bxs-chevron-down arrow' ></i>
                            </div>
                            <ul class="sub-menu">
                                <li><Link class="link_name" to="#">Approval Requests</Link></li>
                                <li><Link to="pending"><span class="fa-solid fa-octagon-exclamation"></span> Pending</Link></li>
                                <li><Link to="approved"><span class="fa-solid fa-thumbs-up"></span>Approved</Link></li>
                            </ul>
                        </li>
                    )}
                    <li>
                        <Link to="#">
                            <i class="fa-solid fa-comment-dots"></i>
                            <span><Link to="chat" class="link_name">Chat</Link></span>
                        </Link>
                        <ul class="sub-menu blank">
                            <li><Link class="link_name" to="chat">Chat</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/logout">
                            <i class="fa-regular fa-arrow-right-from-bracket"></i>
                            <span class="link_name">Logout</span>
                        </Link>
                        <ul class="sub-menu blank">
                            <li><Link class="link_name" to="/logout">Logout</Link></li>
                        </ul>
                    </li>

                    {/* <li>
                            <div class="profile-details">
                                <div class="profile-content">
                                    <img src="image/profile.jpg" alt="profileImg" />
                                </div>
                                <div class="name-job">
                                    <div class="profile_name">Priya</div>
                                    <div class="job">Admin</div>
                                </div>
                                <i class='bx bx-log-out' ></i>
                            </div>
                        </li> */}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
