import React from 'react'

function Test() {
  const call = async() => {
    try {
      const response = await fetch('http://localhost:8080/lscchat/v1.0/addsendlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message_type: 1,
          message: "Hii"
      }),
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data.id);
      // Handle the response data here
      console.log('Response from server:', data);
    } catch (error) {
      console.error('Error:', error.message);
    }
    
  }
  call();
  
  
    return (
      <div>Testing.....</div>
    );
  }
  
  export default Test;
  