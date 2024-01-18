import React from 'react'
import './Sendlist.css'
function Sendlist() {
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
                {jsonData.map((data, index) => (
                <details>
                    <summary key={index}>
                        <div>
                            <span>{data.template_name}</span>
                            <span>{data.date}</span>
                            <span className='status-span'><span className={(data.status == 0) ? 'status status-success' : 'status status-failed'}><span className='dot'>&#183;</span> {(data.status == 0) ? 'success' : 'failed'}</span></span>
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
                                                        <h4 className="my-1 text-info">{data.total}</h4>
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
                                                        <p className="mb-0 text-secondary">Send</p>
                                                        <h4 className="my-1 text-info t-c-2">{data.send}</h4>
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
                                                        <h4 className="my-1 text-info t-c-3">{data.read}</h4>
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
                                                        <h4 className="my-1 text-info t-c-4">{data.reply}</h4>
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
                                                        <h4 className="my-1 text-info t-c-5">{data.not_send}</h4>
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