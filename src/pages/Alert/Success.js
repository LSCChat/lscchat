import React from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react';
import './Success.css'
import { Link } from 'react-router-dom';
const Success = ({title = 'Success', description = '', button2 = 'View', button2URL = ''}) => {
    useEffect(() => {
        const showBtn = document.querySelector(".show-modal");
        const closeBtn = document.querySelector(".close-btn");
        const section = document.querySelector("section");
        const overlay = document.querySelector(".overlay");



        const hideModal = () => {
            section.classList.remove("active");
        };

    
        overlay.addEventListener("click", hideModal);
        closeBtn.addEventListener("click", hideModal);

        return () => {
            overlay.removeEventListener("click", hideModal);
            closeBtn.removeEventListener("click", hideModal);
        };
    }, []);
    return (
        <div className='main-success'>
            <section className='active'>
                <span class="overlay"></span>
                <div class="modal-box">
                    <i class="fa-regular fa-circle-check"></i>
                    <h2>{title}</h2>
                    <h3>{description}</h3>
                    <div class="buttons">
                        <button class="close-btn">Ok, Close</button>
                        <button><Link to={button2URL}>{button2}</Link></button>
                    </div>
                </div>
            </section>
        </div>
    )
}

Success.propTypes = {}

export default Success