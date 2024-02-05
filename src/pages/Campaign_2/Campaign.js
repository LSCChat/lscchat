import React, { useState } from 'react';

import './Campaign.css';

const Wizard = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const handleNext = () => {
    if (activeTab < 4) {
      setActiveTab((prevTab) => prevTab + 1);
    }
  };

  const handlePrevious = () => {
    if (activeTab > 1) {
      setActiveTab((prevTab) => prevTab - 1);
    }
  };

  return (
    <div className="container main-campaign">
      <div className="wizard my-5">
        <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
          {[1, 2, 3, 4].map((tabNumber) => (
            <li
              key={tabNumber}
              className={`nav-item flex-fill ${tabNumber === activeTab ? 'active' : ''}`}
              role="presentation"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={`Step ${tabNumber}`}
            >
              <a
                className="nav-link rounded-circle mx-auto d-flex align-items-center justify-content-center"
                href={`#step${tabNumber}`}
                id={`step${tabNumber}-tab`}
                data-bs-toggle="tab"
                role="tab"
                aria-controls={`step${tabNumber}`}
                aria-selected={tabNumber === activeTab}
                onClick={() => handleTabClick(tabNumber)}
              >
                {tabNumber === 1 && <i className="fas fa-folder-open"></i>}
                {tabNumber === 2 && <i className="fas fa-briefcase"></i>}
                {tabNumber === 3 && <i className="fas fa-star"></i>}
                {tabNumber === 4 && <i className="fas fa-flag-checkered"></i>}
              </a>
            </li>
          ))}
        </ul>
        <div className="tab-content" id="myTabContent">
          {[1, 2, 3, 4].map((tabNumber) => (
            <div
              key={tabNumber}
              className={`tab-pane fade ${tabNumber === activeTab ? 'show active' : ''}`}
              role="tabpanel"
              id={`step${tabNumber}`}
              aria-labelledby={`step${tabNumber}-tab`}
            >
              <div>
              <h3>Step {tabNumber}</h3>
              <p>This is step {tabNumber}</p>
              <label>Enter your Campaign Name</label><br/>
              <input id='cam_name'/>
              </div>
              <div className="d-flex justify-content-between">
                {tabNumber !== 1 && (
                  <a className="btn btn-secondary previous" onClick={handlePrevious}>
                    ghdgfhj
                    <i className="fas fa-angle-left"></i> Back
                  </a>
                )}
                {tabNumber !== 4 ? (
                  <a className="btn btn-info next" onClick={handleNext}>
                    Continue <i className="fas fa-angle-right"></i>
                  </a>
                ) : (
                  <a className="btn btn-info next" onClick={() => alert('Submit action')}>
                    Submit <i className="fas fa-angle-right"></i>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wizard;
