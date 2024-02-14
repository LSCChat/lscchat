
import { useEffect, useState } from 'react';
import './Addcontacts.css';
// import excel from '../../asset/Capture.PNG';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useContext } from 'react';
import { PrefixUrlContext } from "../..";

function Addcontacts() {
  const backendURL = useContext(PrefixUrlContext);
  const [mcontact, setMcontact] = useState({
    fullname: "",
    mobile_no: "",
    email: "",
    location: ""
  })
  const { fullname, mobile_no, email, location } = mcontact
  const onInputChange = (e) => {
    setMcontact({ ...mcontact, [e.target.name]: e.target.value })
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(backendURL+'/lscchat/v1.0/addcontactmanual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullname, mobile_no, email, location }),
        credentials: 'include',
      });
      

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your action was successful.',
      });
        
      
      const data = await response.json();
      // Handle the response data here
      console.log('Response from server:', data);
      if (data.email != null) {
        // navigate("/send")

      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      // Handle errors, e.g., network errors or server errors
      console.error('Error:');
    }
  }
  useEffect(() => {
    // Hide the excel-down div when the component mounts
    const excelDownElements = document.getElementsByClassName('excel-down');

    for (let i = 0; i < excelDownElements.length; i++) {
      excelDownElements[i].style.display = 'none';
    }
  }, []);

 

  function manual() {
    let manualForm = document.querySelector('form');
    if (manualForm) {
      manualForm.style.display = 'block';
    }

    // Show the excel-down div
    const excelDownElements = document.getElementsByClassName('excel-down');
    for (let i = 0; i < excelDownElements.length; i++) {
      excelDownElements[i].style.display = 'none';
    }
  }

  function Excel() {
    let excelForm = document.querySelector('form');
    if (excelForm) {
      excelForm.style.display = 'none';
    }

    // Hide the excel-down div
    const excelDownElements = document.getElementsByClassName('excel-down');
    for (let i = 0; i < excelDownElements.length; i++) {
      excelDownElements[i].style.display = 'flex';
    }
  }



  function downloadCSV() {

    // Generate a CSV string (replace this with your actual data)
    const csvData = "Full Name,Mobile Number,Email,Location\nJohn Doe,1234567890,anitha@gmail.com,New York\nJane Doe,9876543210,gokul@gmail.com,California";

    // Create a download link
    const downloadLink = document.createElement('a');
    const blob = new Blob([csvData], { type: 'text/csv' });

    // Set the filename for the download
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'addcontacts.csv';

    // Append the link to the DOM and trigger the click event
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Clean up by removing the link from the DOM
    document.body.removeChild(downloadLink);


  }

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch(backendURL+'/lscchat/v1.0/addcontactExcel', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your action was successful.',
      });
      const data = await response.text();
      console.log('Response from server:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // You can perform additional operations here if needed
    // (e.g., display the filename)
    console.log('Selected file:', file.name);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
  
    const fileInput = document.getElementById('img');
    const file = fileInput.files[0];
  
    if (file) {
      uploadFile(file);
    } else {
      console.error('No file selected');
    }
  };
  

  return (
    <div className='main-addcontacts'>
      <div className='content-container'>
        <div className='details-row w3-animate-bottom'>
          <div className="card-2">
            <div className='details-header'>
              <div className='details-header-name'>
                <p>contact List</p>
                <p>Contacts Details</p>
              </div>
              <div className='details-header-btn'>
                <button className='payroll-btn-1' onClick={manual}><i class="fa-regular fa-bars-filter"></i> Manual</button>
                <button className='payroll-btn-1' onClick={Excel}><i class="fa-regular fa-arrow-right-from-bracket" style={{ transform: 'rotate(270deg)' }}></i> Excel</button>
              </div>
            </div>
            <div className='c-form'>
              <form id='form' onSubmit={(e) => onSubmit(e)}>
                <div className='new-row'>
                  <div className='input-field'>
                    <label for="full-name">Full Name</label>
                    <input type='text' name='fullname' id='full-name' value={fullname} onChange={(e) => onInputChange(e)} />
                  </div>
                  <div className='input-field'>
                    <label for="mobile">Mobile Number</label>
                    <input type='number' name='mobile_no' id='mobile' value={mobile_no} onChange={(e) => onInputChange(e)} />
                  </div>
                  <div className='input-field'>
                    <label for="loacation">Email</label>
                    <input type='email' name='email' id='email' value={email} onChange={(e) => onInputChange(e)} />
                  </div>
                  <div className='input-field'>
                    <label for="loacation">Location</label>
                    <input type='text' name='location' id='loacation' value={location} onChange={(e) => onInputChange(e)} />
                  </div>

                </div>
                {/* <div className='new-row'>
                                    <div className='input-field'>
                                        <label for="text">Comment</label>
                                        <textarea id="text" name="text" rows="4" cols="50"></textarea>
                                    </div>
                                </div> */}
                <div className='new-row'>
                  <div className='input-field'>
                    <button className='btn-1 m-auto mt-4'>Submit</button>
                  </div>
                </div>
              </form>
              <div className='excel-down'>
                {/* <img src={excel}></img> */}

                <p>Please click and download the Excel format to upload the contacts details </p>
                <button onClick={downloadCSV} id='download'> Excel Download</button><br></br>
                <div className='excel-upload'>
                  <form encType="multipart/form-data" onSubmit={handleSubmit}>
                    <input type="file" name="uploadfile" id="img" onChange={handleFileChange} style={{ display: "none" }} />
                    <label for="img"> <i class="fa-solid fa-cloud-arrow-up" style={{ fontSize: "75px", color: '#2a95ab', cursor: 'pointer' }}></i><br></br><br></br></label><br></br>

                    <p>Drop files or Upload</p><br></br>
                    <button id='submit'>Submit</button>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Addcontacts