import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
function Navbar() {
    useEffect(() => {
        const handleArrowClick = (e) => {
          const arrowParent = e.currentTarget.parentElement.parentElement; // Selecting main parent of arrow
          arrowParent.classList.toggle('showMenu');
        };
    
        const handleSidebarToggle = () => {
          const sidebar = document.querySelector('.sidebar');
          sidebar.classList.toggle('close');
        };
    
        const arrows = document.querySelectorAll('.arrow');
        arrows.forEach((arrow) => {
          arrow.addEventListener('click', handleArrowClick);
        });
    
        const sidebarBtn = document.querySelector('.bar');
        sidebarBtn.addEventListener('click', handleSidebarToggle);
    
        return () => {
          arrows.forEach((arrow) => {
            arrow.removeEventListener('click', handleArrowClick);
          });
          sidebarBtn.removeEventListener('click', handleSidebarToggle);
        };
      }, []);

    return (
        <nav>
                <div class="sidebar">
                    <div>
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
                                <li><Link to="addcontacts"><span class="fa-solid fa-user-plus"></span> Create Campaign</Link></li>
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
                        <li>
                            <Link to="#">
                                <i class="fa-solid fa-comment-dots"></i>
                                <span class="link_name">Chat</span>
                            </Link>
                            <ul class="sub-menu blank">
                                <li><Link class="link_name" to="#">Chat</Link></li>
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
                </div>
        </nav>
    )
}

export default Navbar
