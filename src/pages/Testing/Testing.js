// import React from 'react'
// import axios from 'axios';
// import { useContext } from 'react';
// import { useState, useEffect } from 'react';
// import { PrefixUrlContext } from "../..";
// function Testing() {
//     const [contact, setContact] = useState([]);
//     //Fetching data onload
//     useEffect(() => {
//   fetchContactDetails();
// }, []);

// const fetchContactDetails = async () => {
//   const backendURL = useContext(PrefixUrlContext);
//   try {
//     const response = await fetch(backendURL+'/lscchat/v1.0/contactdetails', {
//       method: 'GET',
//       credentials: 'include', // Ensure cookies are sent for session management
//       headers: {
//         'Content-Type': 'application/json', // Specify content type for clarity
//       },
//       credentials: 'include',
//     });
  
//     if (!response.ok) {
//       throw new Error(`HTTP error ${response.status}: ${response.statusText}`); // Provide specific error details
//     }
  
//     const result = await response.json();
//     console.log(result[0]);
//   } catch (error) {
//     console.error('Error fetching contact details:', error);
//   }
// };

//   return (
//     <div>Testing</div>
//   )
// }

// export default Testing