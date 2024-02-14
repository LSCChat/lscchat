import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { PrefixUrlContext } from "../..";

function Logout() {
    const backendURL = useContext(PrefixUrlContext);
    let navigate = useNavigate();
    //Fetching data onload
    useEffect(() => {
        callLogout();
    }, []);

    const callLogout = async () => {
    try {
        const response = await fetch(backendURL+'/lscchat/v1.0/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Specify content type for clarity
        },
        credentials: 'include',
        });
    
        if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`); // Provide specific error details
        }
    
        const result = await response.text();
        if(result=="success"){
            navigate("/")
        }
        console.log(result);
    } catch (error) {
        console.error('Error fetching contact details:', error);
    }
    };
  return (
    <div>
        
    </div>
  )
}

export default Logout